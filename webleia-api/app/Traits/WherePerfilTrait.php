<?php

namespace App\Traits;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Builder;

trait WherePerfilTrait {

    public function where_perfil(Builder &$query){

        if (!property_exists($this, 'userSession')
            || !($this->userSession instanceof Usuario)
        ) return;

        if($this->userSession->is_aluno)
            $this->where_perfil_aluno($query);

    }

    public function where_perfil_aluno(Builder &$query){
        $query->where('aluno_id', $this->userSession->aluno_id);
    }

}
