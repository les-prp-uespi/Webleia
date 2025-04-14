import { Grid2 } from '@mui/material';
import { RegisterForm } from './components';
import { ImagesBar } from 'pages/auth/components';
import { Version } from '../styles';
import packageInfo from "../../../../package.json";

const VERSAO_WEB = packageInfo.version;
const RegisterPage = () => {
  return (
    <Grid2 container justifyContent="center" alignItems="start" >
      <Grid2
        width='100%'
        maxWidth="400px"
        borderRadius="5px"
        border="1px solid #CDCDCD"
        padding="0 10px"
        bgcolor="white"
        marginTop="30px"
      >
        <RegisterForm />
        <ImagesBar />
        <Version>Versão {VERSAO_WEB}</Version>
      </Grid2>
    </Grid2>
  );
};

export default RegisterPage;
