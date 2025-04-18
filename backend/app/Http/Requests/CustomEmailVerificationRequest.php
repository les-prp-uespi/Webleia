<?php

namespace App\Http\Requests;

use App\Models\Usuario;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class CustomEmailVerificationRequest extends EmailVerificationRequest {

    protected Usuario $usuario;

    public function authorize(){
        $this->usuario = Usuario::findOrFail($this->route('id'));
        if (! hash_equals((string) $this->route('hash'), sha1($this->usuario->getEmailForVerification()))) {
            return false;
        }
        return true;
    }

    public function fulfill(){
        if (! $this->usuario->hasVerifiedEmail()) {
            $this->usuario->markEmailAsVerified();
        }
    }
}
