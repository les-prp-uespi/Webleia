<?php


namespace App\Exceptions;


use Illuminate\Contracts\Validation\Validator;
use App\Models\AppModel;

class ValidationException extends \Exception {

    /**
     * Illuminate\Contracts\Validation\Validator
     * @var Validator|null
     */
    protected ?Validator $validator;

    /**
     * @var AppModel|null
     */
    protected ?AppModel $model;

    /**
     * ValidationException constructor.
     * @param Validator|null $validator
     * @param string $message
     * @param int $code
     * @param AppModel|null $model
     */
    public function __construct(?Validator $validator, ?AppModel $model = null, string $message = 'Dados inválidos', int $code = 400) {
        parent::__construct($message, $code);
        $this->validator = $validator;
        $this->model = $model;
    }

    public function getErros() : array {
        return $this->validator != null ? $this->validator->errors()->toArray() : array();
    }

    public function getData(): array{
        return $this->getErros();
    }

    /**
     * @return string
     */
    public function getMsg() : string {
        $msg = $this->message ?? '';
        return $this->model != null ? $this->model->getShortClassName().": ".$msg : $msg;
    }

    /**
     * @param mixed $message
     */
    public function setMessage($message): void {
        $this->message = $message;
    }
}
