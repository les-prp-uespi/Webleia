<?php


namespace App\Repository;


use App\Config\Constantes;
use App\Models\Anexo;
use App\Models\AppModel;
use App\Traits\UploadTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AnexoRepository extends BaseCrudRepository {

    use UploadTrait;

    protected static $orderDefault = 'id';
    protected static $sortDefault = 'desc';

    protected function setupModel() {
        $this->model = new Anexo();
    }

    public function saveByRequest(Request $request, int $id = 0): AppModel{
        $params = $request->all();

        $types = isset($params['tipo']) ? Anexo::tiposExtensoes($params['tipo']) : [];

        $img = $this->upload($request, 'arquivo', 'anexos/', Constantes::MAX_SIZE_FILE, 0, types: $types, public: false);
        if($img != null) $params['arquivo'] = $img;
        return $this->save($params, $id);
    }

    public function save(array $data, int $id = 0): AppModel {
        $data['usuario_id'] = $this->userSession->id;
        return parent::save($data, $id);
    }

    protected function beforeUpdate(AppModel $model, array $data){
        if(isset($data['arquivo']) && !empty($model->getOriginal('arquivo'))
            && $model->getOriginal('arquivo') != $data['arquivo'])
            $this->deleteFile($model->getOriginal('arquivo'));
    }

    protected function where(Builder &$query, Request $request) {

        $query->from('anexo_list', $this->tableName); //view q traz o nome do model relacionado

        $query->where('relacionado_deleted_at'); //nao retornar arquivos de modelos relacionados excluidos

        if($request->filled('nome'))
            $query->where(function(Builder $q) use ($request){
                $q->where('nome', 'like', "%".$request->nome."%");
                $q->orWhere('relacionado_nome', 'like', "%".$request->nome."%");
            });

        if($request->filled('tipo'))
            $query->where('tipo', $request->tipo);

    }

}
