<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class VerificarEmail extends VerifyEmail {
    protected function buildMailMessage($url) {

        $url = str_replace('/verificar/', '/api/verificar/', $url);

        return (new MailMessage)
            ->subject(Lang::get('Valide seu endereço de e-mail'))
            ->line(Lang::get('Clique no botão abaixo para verificar seu endereço de e-mail.'))
            ->action(Lang::get('Valide seu endereço de e-mail'), $url)
            ->line(Lang::get('Se você não criou uma conta, nenhuma ação adicional será necessária.'));
    }
}
