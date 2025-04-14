<?php


namespace App\Repository;


use App\Models\Aluno;
use App\Models\AppModel;
use App\Models\GeneroTextual;
use App\Models\InstituicaoEnsino;
use App\Models\ProducaoTextual;
use App\Models\ProducaoTextualResposta;
use App\Models\Usuario;
use App\Service\MobiReportService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProducaoTextualRepository extends BaseCrudRepository {

    protected static $orderDefault = 'id';
    protected static $sortDefault = 'desc';

    protected function setupModel() {
        $this->model = new ProducaoTextual();
    }

    public function save(array $data, int $id = 0): AppModel {
        if($id <= 0) {
            $data['usuario_id'] = $this->userSession->id;
            $data['status'] = ProducaoTextual::ST_NAO_INICIADO;
        }
        if(isset($data['texto']))
            $data['num_palavras'] = Str::wordCount(Str::ascii(strip_tags($data['texto'])));
        return parent::save($data, $id);
    }

    public function clone($id): AppModel{

        DB::beginTransaction();

        try{

            $obj = $this->find($id);
            $new = $obj->replicate();
            $new->titulo = "COPIA de ".$obj->titulo;
            $new->created_at = now();
            $new->status = ProducaoTextual::ST_EM_ANDAMENTO;
            $new->save();

            $obj->respostas()->each(function(ProducaoTextualResposta $r) use ($new){
                $rnew = $r->replicate();
                $rnew->producao_textual_id = $new->id;
                $rnew->created_at = now();
                $rnew->save();
            });

            $new->respostas; //soh para carregar
            DB::commit();
            return $new;

        }catch (\Exception $ex){
            DB::rollBack();
            throw $ex;
        }

    }

    public function export(int $id, int $docx){

        $obj = $this->find($id);

        $mobiReportSerivce = new MobiReportService();
        return $mobiReportSerivce->request('relatorio_web_leia',[
           'texto' => $obj->texto,
           'titulo' => $obj->titulo,
           'nome_usuario' => $obj->usuario->nome,
           'is_docx' => $docx,
        ]);

    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('titulo'))
            $query->where('titulo', 'like', "%".$request->titulo."%");
        if($request->filled('genero_textual_id'))
            $query->where('genero_textual_id', $request->genero_textual_id);
        if($request->filled('status'))
            $query->where('status', $request->status);
        if($request->filled('usuario_id'))
            $query->where('usuario_id', $request->usuario_id);

        UsuarioRepository::relationWhere($query, $request, 'usuario');

        if(!$this->userSession->is_admin)
            $query->where('usuario_id', $this->userSession->id);
    }

    public function groupByStatus(Request $request){
        $request->merge(['order' => 'status', 'limit' => 0]);
        return $this->groupBy('status', 'status', $request);
    }

    public function groupByGeneroTextual(Request $request){
        $request->merge(['limit' => 0]);
        $tbRel = GeneroTextual::getTableName();
        return $this->groupBy("{$tbRel}.id, {$tbRel}.nome", "{$tbRel}.id", $request, function(Builder $q){
            $q->joinRelationship("genero_textual");
            $q->orderByRaw('2 ASC');
        });
    }

    public function groupByUsuario(Request $request){
        $tbRel = Aluno::getTableName();
        $tbRel2 = InstituicaoEnsino::getTableName();
        return $this->groupBy("{$tbRel}.id, {$tbRel}.nome, usuario.foto, {$tbRel}.instituicao_ensino_id, {$tbRel2}.nome instituicao_ensino_nome", "usuario.id", $request, function(Builder $q){
            $q->joinRelationship("usuario.aluno")->leftJoinRelationship('usuario.aluno.instituicao_ensino');
        });
    }

}
