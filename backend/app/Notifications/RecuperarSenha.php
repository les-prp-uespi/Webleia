<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Hash;

class RecuperarSenha extends ResetPasswordNotification
{
    use Queueable;

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {

        $url = env('APP_WEB_URL').'/auth/recuperar-senha/'.$this->token; //url web

        return (new MailMessage)
            ->subject('Redefinição de Senha')
            ->line('Você recebeu esse e-mail porque foi solicitado uma redefinição de senha na sua conta.')
            ->action('Redefinir senha', $url)
            ->line('O link de redefinição de senha irá expirar em 60 minutos.')
            ->line('Se você não solicitou essa redefinição de senha, ignore este e-mail.');
    }
}
