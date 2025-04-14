<?php


namespace App\Repository;


use App\Models\AppModel;
use App\Models\ProducaoTextual;
use App\Models\ProducaoTextualResposta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProducaoTextualRespostaRepository extends BaseCrudRepository {

    protected static $orderDefault = 'id';
    protected static $sortDefault = 'desc';

    protected function setupModel() {
        $this->model = new ProducaoTextualResposta();
    }

    protected function beforeSave(array &$data) {
        if(isset($data['producao_textual_id'])){
            $aux = new ProducaoTextualRepository($this->userSession);
            $aux->find($data['producao_textual_id']); //somente para validar
        }
        parent::beforeSave($data);
    }

    public function save(array $data, int $id = 0): AppModel {
        if(isset($data['resposta']))
            $data['num_palavras'] = Str::wordCount(Str::ascii(strip_tags($data['resposta'])));
        return parent::save($data, $id);
    }

    protected function afterSave(AppModel $model, array $data) {
        if($model->producao_textual->status == ProducaoTextual::ST_NAO_INICIADO)
            $model->producao_textual->update(['status' => ProducaoTextual::ST_EM_ANDAMENTO]);
    }

    public function usoTextoFinal(int $producao_textual_id, array $ids, int $usar){

        $aux = new ProducaoTextualRepository($this->userSession);
        $producao_textual = $aux->find($producao_textual_id);

        $producao_textual->respostas()
            ->whereIn('id', $ids)
            ->update(['uso_texto_final' => $usar]);

        return true;
    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('resposta'))
            $query->where('resposta', 'like', "%".$request->resposta."%");
        if($request->filled('uso_texto_final'))
            $query->where('uso_texto_final', $request->uso_texto_final);
        if($request->filled('producao_textual_id'))
            $query->where('producao_textual_id', $request->producao_textual_id);
        if($request->filled('pergunta_id'))
            $query->where('pergunta_id', $request->pergunta_id);
        ProducaoTextualRepository::relationWhere($query, $request, 'producao_textual', userSession: $this->userSession);
    }

}
