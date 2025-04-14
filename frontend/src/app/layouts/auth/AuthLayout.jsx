import { Outlet } from 'react-router';
import { LayoutContainer, Logo } from './styles';
import { Container, Grid2 } from '@mui/material';

const AuthLayout = () => {
  return (
    <>
      <LayoutContainer>
        <Grid2
          sx={{
            mt: '20px',
          }}
        >
          <Logo src="/images/logo_with_slogan.svg" />
          <Outlet />
        </Grid2>
      </LayoutContainer>
    </>
  );
};

export default AuthLayout;
