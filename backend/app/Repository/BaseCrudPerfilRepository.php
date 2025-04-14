<?php


namespace App\Repository;



use App\Config\Constantes;
use App\Models\AppModel;

/**
 * Classe que permite operacoes de alteracao somente para o perfil configurado
 */
abstract class BaseCrudPerfilRepository extends BaseCrudRepository {

    protected static array $perfil = [Constantes::PERFIL_ADMIN];

    public function save(array $data, int $id = 0): AppModel {
        $this->checkPerfil();
        return parent::save($data, $id);
    }

    public function delete(int $id): bool {
        $this->checkPerfil();
        return parent::delete($id);
    }

    public function restore(int $id): bool {
        $this->checkPerfil();
        return parent::restore($id);
    }

    public function status(int $id, $status): bool {
        $this->checkPerfil();
        return parent::status($id, $status);
    }

    protected function checkPerfil(): void{
        if(!$this->hasPerfil())
            throw new \Exception(Constantes::MSG_NO_PERMISSION, 401);
    }

    protected function hasPerfil(): bool{
        return in_array($this->userSession->perfil, static::$perfil);
    }

}
