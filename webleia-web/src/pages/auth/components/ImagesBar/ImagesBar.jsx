import { Grid2 } from '@mui/material';

const ImagesBar = () => {
  return (
    <Grid2 justifyContent={'center'} container spacing={2} margin={'10px 0'}>
      <img width={67} src="/images/logo_gov_piaui.svg" alt="" />
      <img width={26} src="/images/logo_uespi.svg" alt="" />
      <img width={63} src="/images/logo_letras.svg" alt="" />
      <img width={73} src="/images/logo_leia.svg" alt="" />
    </Grid2>
  );
};

export default ImagesBar;
