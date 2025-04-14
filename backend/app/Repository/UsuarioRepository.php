<?php


namespace App\Repository;


use App\Config\Constantes;
use App\Exceptions\ValidationException;
use App\Models\AppModel;
use App\Models\Usuario;
use App\Traits\UploadTrait;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioRepository extends BaseCrudRepository {

    use UploadTrait;

    protected function setupModel() {
        $this->model = new Usuario();
    }

    public function save(array $data, int $id = 0): AppModel {

        $isNew = $id <= 0;

        if($this->userSession != null){
            if(!$this->userSession->is_admin && isset($data['perfil']) && $data['perfil'] == Constantes::PERFIL_ADMIN)
                throw new ValidationException(null, $this->model, 'Perfil incorreto!');

            if($this->userSession->is_aluno && isset($data['perfil']) && $data['perfil'] != Constantes::PERFIL_ALUNO)
                throw new ValidationException(null, $this->model, 'Perfil incorreto!');

            if($this->userSession->is_aluno)
                $data['aluno_id'] = $this->userSession->aluno_id;

        }else{
            if(!isset($data['perfil']) || $data['perfil'] == Constantes::PERFIL_ADMIN) //permitido somente sem ser admin
                throw new ValidationException(null, $this->model, 'Perfil incorreto!');
            if($id > 0)
                throw new \Exception(Constantes::MSG_NO_PERMISSION, 401);
        }

        if($isNew){
            $this->validateModel($data);
            $obj = new Usuario($data);
            if(!empty($data['senha']))
                $obj->senha = Hash::make($data['senha']);
            $obj->perfil = intval($data['perfil']);
        }else{
            $obj = $this->find($id);
            if(!empty($data['senha'])){
                $obj->senha = Hash::make($data['senha']);
            }
            $obj->fill($data);

            if(isset($data['perfil'])) $obj->perfil = intval($data['perfil']);

            $this->validateModel($obj->getAttributes(), $id);
        }

        $obj->save();

        if($isNew){
            $this->afterCreate($obj, $data);
        }else{
            $this->afterUpdate($obj, $data);
        }

        $this->afterSave($obj, $data);

        return $obj;
    }

    public function saveByRequest(Request $request, int $id = 0): AppModel{
        $params = $request->all();
        $img = $this->upload($request, 'foto', 'usuarios/', Constantes::MAX_SIZE_IMG, 1000, ["jpg", "png", "jpeg"], true);
        if($img != null) $params['foto'] = $img;
        return $this->save($params, $id);
    }

    protected function afterCreate(AppModel $model, array $data) {
        event(new Registered($model));
    }

    public function alterarSenha(string $atual, string $nova){

        if($this->userSession == null) throw new \Exception('Usuário não encontrado!', 401);

        if(!Hash::check($atual, $this->userSession->senha))
            throw new \Exception('Senha atual não confere!', 401);

        $this->userSession->senha = Hash::make($nova);
        return $this->userSession->save();
    }

    protected function where(Builder &$query, Request $request) {

        if($request->filled('nome'))
            $query->where('nome', 'like', "%".$request->nome."%");
        if($request->filled('email'))
            $query->where('email', $request->email);
        if($request->filled('perfil'))
            $query->where('perfil', $request->perfil);
        if($request->filled('aluno_id'))
            $query->where('aluno_id', $request->aluno_id);

        if($this->userSession != null){//usuario da requisicao/logado
            if($this->userSession->is_aluno)
                $query->where('aluno_id', $this->userSession->aluno_id);
        }

    }

    public function groupByPerfil(Request $request){
        $request->merge(['order' => 'perfil', 'limit' => 0]);
        return $this->groupBy('perfil', 'perfil', $request);
    }
}
