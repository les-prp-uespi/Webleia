<?php


namespace App\Repository;


use App\Config\Constantes;
use App\Models\Aluno;
use App\Models\AppModel;
use App\Models\GrauInstrucao;
use App\Models\InstituicaoEnsino;
use App\Models\ProducaoTextual;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AlunoRepository extends BaseCrudRepository {

    protected static $orderDefault = 'nome';

    protected function setupModel() {
        $this->model = new Aluno();
    }

    public function countInstituicaoEnsino(Request $request): int {
        $query = $this->model::query();
        $query->whereNotNull('instituicao_ensino_id');
        $this->where($query, $request);
        return $query->selectRaw('COUNT(DISTINCT instituicao_ensino_id) as total')->first()->total;
    }

    public function createAlunoAndUser(array &$data, bool $scape_user_validation = false): AppModel{

        if(!$scape_user_validation){
            if(!$this->userSession->is_admin)
                throw new \Exception(Constantes::MSG_NO_PERMISSION, 401);
        }

        DB::beginTransaction();

        try{

            $obj = parent::save($data);

            $usuarioRepository = new UsuarioRepository($this->userSession);

            $userData = [
                'nome' => $obj->nome,
                'email' => $obj->email,
                'senha' => $data['senha'] ?? '',
                'perfil' => Constantes::PERFIL_ALUNO,
                'aluno_id' => $obj->id,
            ];

            $usuario = $usuarioRepository->save($userData);
            $data['usuario_id'] = $usuario->id; //para uso em caso de login junto

            DB::commit();

            return $obj;
        }catch (\Exception $ex){
            DB::rollBack();
            throw $ex;
        }

    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('nome'))
            $query->where('nome', 'like', "%".$request->nome."%");
        if($request->filled('email'))
            $query->where('email', $request->email);
        if($request->filled('uf'))
            $query->where('uf', $request->uf);
        if($request->filled('cpf'))
            $query->where('cpf', $request->cpf);
        if($request->filled('grau_instrucao_id'))
            $query->where('grau_instrucao_id', $request->grau_instrucao_id);
        if($request->filled('instituicao_ensino_id'))
            $query->where('instituicao_ensino_id', $request->instituicao_ensino_id);

        if(!$this->userSession->is_admin)
            $query->where('id', $this->userSession->aluno_id);
    }

    public function groupByProducaoTextual(Request $request){
        $tbRel = Aluno::getTableName();
        $tbRel2 = InstituicaoEnsino::getTableName();
        $tbPrd = ProducaoTextual::getTableName();

        $request->merge([
            'order' => 'num_producoes',
            'sort' => 'desc',
        ]);

        return $this->groupBy("{$tbRel}.id, {$tbRel}.nome, foto, {$tbRel}.instituicao_ensino_id, {$tbRel2}.nome instituicao_ensino_nome,
                        COUNT(IF({$tbPrd}.status = ".ProducaoTextual::ST_FINALIZADO.", 1, NULL)) num_producoes",
            "{$tbRel}.id", $request, function(Builder $q) use ($tbPrd){
                $q->leftJoinRelationship("usuario.producoes_textuais");
                $q->leftJoinRelationship('instituicao_ensino');
//                $q->whereRaw("({$tbPrd}.status IS NULL OR {$tbPrd}.status = ?)", [ProducaoTextual::ST_FINALIZADO]);
            });
    }

}
