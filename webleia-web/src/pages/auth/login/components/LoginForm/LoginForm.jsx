import { Box, Button, CircularProgress } from '@mui/material';
import { AuthUtils, Theme } from 'app/shared/utils';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextInput } from 'pages/auth/components';
import { ButtonWhite, ButtonBlue } from 'pages/auth';
import { Link } from './styles';
import { useService } from 'app/shared/hooks';
import { doLogin } from 'app/services/auth';
import { Controller, useForm } from 'react-hook-form';
import { FormAuth } from 'pages/auth/styles';
import toastr from 'toastr';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { control, handleSubmit } = useForm();

  const { request, response } = useService(doLogin, {
    onSuccess: (user) => {
      AuthUtils.setUser(user);
      const isAdmin = user.perfil === '1';
      if (isAdmin) navigate('/admin');
      navigate('/');
    },
  });

  const handleLogin = async (data, e) => {
    e.preventDefault();

    request({
      email: data.email,
      senha: data.senha,
    });
  };

  return (
    <>
      <h1
        style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: '34px', fontWeight: '400' }}
      >
        Login
      </h1>
      <FormAuth onSubmit={handleSubmit(handleLogin)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => <TextInput label={'Email'} type="email" required {...field} />}
        />
        <Controller
          control={control}
          name="senha"
          render={({ field }) => <TextInput label={'Senha'} type="password" required {...field} />}
        />
        <Link href="/auth/recuperar-senha">Recuperar senha</Link>
        <ButtonBlue type="submit" fullWidth variant="contained"
          disabled={response.loading}
          sx={{ mt: '10px', minWidth: '140px' }}>
          {response.loading ? (
            <CircularProgress size="20px" />
          ) : "Acessar"}
        </ButtonBlue>
        <ButtonWhite disabled={response.loading} onClick={() => navigate('/auth/cadastro')} fullWidth variant="contained">
          Criar usuário
        </ButtonWhite>
      </FormAuth>
    </>
  );
};

export default LoginForm;
