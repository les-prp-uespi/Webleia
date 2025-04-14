import { Box, Button } from '@mui/material';
import { recuperarSenha } from 'app/services/auth';
import { useService } from 'app/shared/hooks';
import { Theme } from 'app/shared/utils';
import { TextInput } from 'pages/auth/components';
import { ButtonWhite } from 'pages/auth/styles';
import { ButtonBlue } from 'pages/auth/styles';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toastr from 'toastr';

const ConfirmEmailStep = ({ setStep }) => {
  const { handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { request: requestRecuperSenha, response: recuperarSenhaResponse } = useService(
    recuperarSenha,
    {
      onSuccess: (data) => {
        toastr.success('Código enviado com sucesso! Verifique seu email.');
        setIsLoading(false);
      },
      onError: (data) => {
        setIsLoading(false);
      },
    },
  );

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    await requestRecuperSenha({ email: data.email });
  };

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
        <ButtonBlue loading={isLoading} fullWidth variant="contained" type="submit">
          Enviar código
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

export default ConfirmEmailStep;
