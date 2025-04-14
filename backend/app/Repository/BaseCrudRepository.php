<?php


namespace App\Repository;



use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\ValidationException;
use App\Models\AppModel;

abstract class BaseCrudRepository extends BaseListRepository {

    protected function validate(array $data, array $rules, int $id = 0){

        if($id > 0){
            foreach ($rules as $key => $value){ //validacao correta na edicao
                if(is_string($value) && stripos($value, "unique") !== false)
                    $rules[$key] = $value.",".$id;
                else if(is_array($value)){
                    foreach ($value as $ind => $rl){
                        if(is_string($rl) && stripos($rl, "unique") !== false)
                            $rules[$key][$ind] = $rl.",".$id;
                    }
                }
            }
        }

        $validator = Validator::make($data, $rules);
        if($validator->fails())
            throw new ValidationException($validator, $this->model);
    }

    protected function validateModel(array $data, int $id = 0){
        $validations = $this->model->getValidations($data, $id);
        if(!empty($validations)) $this->validate($data, $validations, $id);
    }

    public function save(array $data, int $id = 0) : AppModel {

        $this->beforeSave($data);

        if($id <= 0){
            $this->beforeCreate($data);
            $this->validateModel($data);
            $obj = $this->model::create($data);
            $this->afterCreate($obj, $data);
        }else{
            $obj = $this->find($id);
            $obj->fill($data);
            $this->beforeUpdate($obj, $data);
            $this->validateModel($obj->getAttributes(), $id);
            $obj->save();
            $this->afterUpdate($obj, $data);
        }

        $this->afterSave($obj, $data);

        return $obj;

    }

    /**
     * Save para casos simples de save interno, sem ser por chamada via api/request
     * Necessario pq usa as validacoes do model, caso nao precise usar o save do model (eloquent)
     *
     * @param AppModel $model
     * @return AppModel
     */
    public function saveModel(AppModel $model): AppModel{
        $data = $model->getAttributes();
        $this->beforeSave($data);
        $this->validateModel($data, $model->id ?? 0);
        $model->save();
        $this->afterSave($model, $data);
        return $model;
    }

    protected function beforeCreate(array &$data){}
    protected function afterCreate(AppModel $model, array $data){}
    protected function beforeUpdate(AppModel $model, array $data){}
    protected function afterUpdate(AppModel $model, array $data){}
    protected function beforeSave(array &$data){}
    protected function afterSave(AppModel $model, array $data){}

    public function saveByRequest(Request $request, int $id = 0) : AppModel {
        return $this->save($request->all(), $id);
    }

    public function delete(int $id) : bool{
        $obj = $this->find($id);
        $this->beforeDelete($obj);
        $ok = $this->deleteModel($obj);
        if($ok) $this->afterDelete($obj);
        return $ok;
    }

    protected function beforeDelete(AppModel $model){}
    protected function afterDelete(AppModel $model){}

    public function deleteModel(AppModel $obj) : bool{
        return $obj->delete();
    }

    public function deleteAll(array $ids){
        foreach ($ids as $id){
            $this->delete($id);
        }
    }

    public function restore(int $id) : bool{
        $obj = $this->find($id, in_array(SoftDeletes::class, class_uses_recursive($this->model), true));
        $this->beforeRestore($obj);
        $ok = $obj->restore();
        if($ok) $this->afterRestore($obj);
        return $ok;
    }

    protected function beforeRestore(AppModel $model){}
    protected function afterRestore(AppModel $model){}

    public function status(int $id, $status) : bool{
        $obj = $this->find($id, in_array(SoftDeletes::class, class_uses_recursive($this->model), true));
        return $obj->update([
            'status' => $status
        ]);
    }

}
