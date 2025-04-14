<?php


namespace App\Repository;


use App\Models\AppModel;
use App\Models\ItemPergunta;
use App\Models\Pergunta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerguntaRepository extends BaseCrudPerfilRepository {

    protected static $orderDefault = 'ordem';

    protected function setupModel() {
        $this->model = new Pergunta();
    }

    public function save(array $data, int $id = 0) : AppModel {

        DB::beginTransaction();
        try{

            if(!in_array($data['tipo'] ?? 0, [Pergunta::TP_SELECAO_UNICA, Pergunta::TP_SELECAO_MULTIPLA])){
                unset($data['itens']);
            }

            $obj = parent::save($data, $id);

            if($obj->isTipoSelecao() && (empty($data['itens']) || !is_array($data['itens'])))
                throw new \Exception("Itens não informados!");

            if(!empty($data['itens'])){

                $campos_ids = [];
                foreach ($data['itens'] as $item_pergunta){

                    $bd = !empty($item_pergunta['id']) ? ItemPergunta::find($item_pergunta['id']) : new ItemPergunta();

                    $bd->pergunta_id = $obj->id;
                    $bd->descricao = $item_pergunta['descricao'] ?? '';
                    $bd->ordem = $item_pergunta['ordem'] ?? 1;
                    $bd->save();

                    $campos_ids[] = $bd->id;

                }
                $obj->itens()->whereNotIn('id', $campos_ids)->delete();
            }else{
                $obj->itens()->delete();
            }

            DB::commit();
            return $obj;
        }catch (\Exception $ex){
            DB::rollBack();
            throw $ex;
        }

    }

    public static function allTipos(): array {
        return Pergunta::listarTipos();
    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('titulo'))
            $query->where('titulo', 'like', "%".$request->titulo."%");
        if($request->filled('descricao'))
            $query->where('descricao', 'like', "%".$request->descricao."%");
        if($request->filled('categoria_pergunta_id'))
            $query->where('categoria_pergunta_id', $request->categoria_pergunta_id);
        if($request->filled('genero_textual_id'))
            $query->where('genero_textual_id', $request->genero_textual_id);
        if($request->filled('obrigatorio'))
            $query->where('obrigatorio', $request->obrigatorio);
    }

}
