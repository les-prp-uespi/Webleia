<?php


namespace App\Models;


use App\Config\Constantes;
use App\Exceptions\ValidationException;
use App\Notifications\RecuperarSenha;
use App\Notifications\VerificarEmail;
use App\Repository\AplicacaoRepository;
use App\Storage\MobiStorage;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends AppModel implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract, MustVerifyEmailContract {

    use Authenticatable, Authorizable, CanResetPassword, MustVerifyEmail, HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'usuario';

    protected $guarded = ['id', 'senha'];

//    protected $visible = ['id', 'nome', 'email', 'perfil', 'foto'];

    protected $hidden = ['senha', 'email_verified_at', 'remember_token', 'deleted_at'];

    protected static $validations = [
        'nome' => 'required',
        'email' => 'required|email|unique:usuario,email',
        'senha' => 'required|min:6|max:100',
        'perfil' => 'required|numeric|gt:0',
        'aluno_id' => 'nullable|exists:aluno,id',
    ];

    protected function validate() {
        if($this->is_aluno && $this->aluno == null)
            throw new ValidationException(null, $this, 'Perfil de aluno, sem aluno informado!');

        if($this->is_aluno && self::withTrashed()->where('aluno_id', $this->aluno_id)->where('id', '!=', $this->id)->exists())
            throw new ValidationException(null, $this, 'Aluno já possui usuário!');
    }

    public function aluno() { return $this->belongsTo(Aluno::class, 'aluno_id'); }

    public function producoes_textuais(){
        return $this->hasMany(ProducaoTextual::class);
    }

    public function getIsAdminAttribute(){ return $this->perfil == Constantes::PERFIL_ADMIN; }

    public function getIsAlunoAttribute(){ return $this->perfil == Constantes::PERFIL_ALUNO; }

    public function getCacheDirAttribute(): string{
        return match (intval($this->perfil)) {
            Constantes::PERFIL_ADMIN => $this->perfil . '/',
            Constantes::PERFIL_ALUNO => $this->perfil . '/' . $this->aluno_id . '/',
            default => '',
        };
    }

    public function getObjRelacionado() : ?object {
        return match (intval($this->perfil)) {
            Constantes::PERFIL_ALUNO => $this->aluno,
            default => null,
        };
    }

    public function getToken($data){
        return md5(env('APP_NAME').$this->usuario_id.$data);
    }

    public function getTokenAtual(){
        return $this->getToken(microtime());
    }

    public function getLongToken(){

        $data = microtime();

        $tk = $this->getToken($data);
        $tk .= md5('long'.env('TOKEN_KEY').$this->usuario_id.$data);

        return $tk;
    }

    public function toLoginArray($aplicacao_id = 0){
        $data = $this->toArray();
        $data['token'] = $this->getTokenAtual();

        if($this->is_aluno){
            $relacionado = $this->aluno()->with(['grau_instrucao', 'instituicao_ensino.cidade'])->get();
        }else{
            $relacionado = $this->getObjRelacionado();
        }

        $data['relacionado'] = $relacionado != null ? $relacionado->toArray() : null;
        unset($data['aluno']);

        if($aplicacao_id > 0){
            $data['app_configuracoes'] = AplicacaoRepository::configuracoesByAplicacao($aplicacao_id);
        }

        return $data;
    }

    public function toArray(): array{
        $data = parent::toArray();
        if(isset($data['foto'])) $data['thumb'] = MobiStorage::getThumbDefault($this->foto);
        return $data;
    }

    public function checkUser(?Usuario $usuario): bool {
        if ($usuario == null) return false;
        if ($usuario->is_admin) return true;

        return $usuario->id == $this->id;
    }

    public function sendPasswordResetNotification($token) {
        $this->notify(new RecuperarSenha($token));
    }

    public function sendEmailVerificationNotification() {
        $this->notify(new VerificarEmail());
    }
}
