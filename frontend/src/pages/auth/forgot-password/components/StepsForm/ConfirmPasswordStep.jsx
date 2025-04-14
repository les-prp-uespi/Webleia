import { Box } from '@mui/material';
import { resetarSenha } from 'app/services/auth';
import { useService } from 'app/shared/hooks';
import { TextInput } from 'pages/auth/components';
import { ButtonWhite } from 'pages/auth/styles';
import { ButtonBlue } from 'pages/auth/styles';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import SuccessRecovery from './SuccessRecovery';

const ConfirmPasswordStep = () => {
  const { handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useParams();

  const { request: requestResetarSenha, response: recuperarSenhaResponse } = useService(
    resetarSenha,
    {
      onSuccess: (data) => {
        setIsLoading(false);
        setSuccess(true)
        toastr.success('Senha resetada com sucesso');
      },
      onError: (data) => {
        setIsLoading(false);
      },
    },
  );

  const onSubmit = (data, e) => {
    e.preventDefault();
    setIsLoading(true);

    if (data.senha !== data.confirmacaoSenha) {
      toastr.error('As senhas digitadas não conferem');
      setIsLoading(false);
      return;
    }

    requestResetarSenha({
      email: data.email,
      token,
      senha: data.senha,
    });
  };

  if (success) {
    return <SuccessRecovery />
  }

  return (
    <>
      <h1
        style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: '34px', fontWeight: '400' }}
      >
        Recuperar senha
      </h1>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, minWidth: '100px' } }}
        noValidate
        autoComplete="off"
        paddingRight={'10px'}
        paddingLeft={'10px'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => <TextInput type="email" {...field} label="Email" required />}
        />
        <Controller
          control={control}
          name="senha"
          render={({ field }) => <TextInput type="password" {...field} label="Senha" required />}
        />
        <Controller
          control={control}
          name="confirmacaoSenha"
          render={({ field }) => (
            <TextInput type="password" {...field} label="Confirmar senha" required />
          )}
        />
        <ButtonBlue loading={isLoading} fullWidth variant="contained" type="submit">
          Enviar
        </ButtonBlue>
        <ButtonWhite
          onClick={() => {
            window.location.href = '/auth/login';
          }}
          fullWidth
          variant="contained"
        >
          Voltar
        </ButtonWhite>
      </Box>
    </>
  );
};

export default ConfirmPasswordStep;
