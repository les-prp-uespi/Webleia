import { Box, Button, Grid, Grid2, TextField } from '@mui/material';
import { Link } from './styles';
import { ImagesBar } from 'pages/auth/components';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { Version } from '../styles';
import packageInfo from "../../../../package.json";

const VERSAO_WEB = packageInfo.version;
const ForgotPasswordPage = () => {
  return (
    <Grid2 container justifyContent="center" alignItems="start" minHeight="100vh">
      <Grid2
        xs={4}
        sm={4}
        md={4}
        lg={4}
        size={4}
        borderRadius="5px"
        border="1px solid #CDCDCD"
        padding="0 10px"
        bgcolor="white"
        marginTop={10}
      >
        <ForgotPasswordForm />
        <ImagesBar />
        <Version>Versão {VERSAO_WEB}</Version>
      </Grid2>
    </Grid2>
  );
};

export default ForgotPasswordPage;
