import { Grid2 } from '@mui/material';
import { LoginForm } from './components';
import { ImagesBar } from 'pages/auth/components';
import { Version } from '../styles';
import toastr from 'toastr';

import packageInfo from "../../../../package.json";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const VERSAO_WEB = packageInfo.version;
const LoginPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const validacao = query.get("validacao");

  useEffect(() => {
    if (validacao === '1') {
      toastr.success("Email validado com sucesso")
    }
  }, [])

  return (
    <Grid2 container justifyContent="center" alignSelf='center' margin='auto' alignItems="start">
      <Grid2
        width='100%'
        maxWidth="400px"
        borderRadius="5px"
        border="1px solid #CDCDCD"
        padding="0 10px"
        bgcolor="white"
        marginTop="30px"
      >
        <LoginForm />
        <ImagesBar />
        <Version>Versão {VERSAO_WEB}</Version>
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;
