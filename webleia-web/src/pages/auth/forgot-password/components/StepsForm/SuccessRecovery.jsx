import { Box, Typography } from "@mui/material"
import { Theme } from "app/shared/utils";
import { ButtonWhite } from "pages/auth/styles";

const SuccessRecovery = () => {
    return (
        <Box padding='10px'>
            <Typography variant="h4" textAlign='center' color={Theme.colors.green}>Senha alterada com sucesso!</Typography>
            <Typography my="10px" textAlign='center'>Prossiga para a tela de login para conectar-se.</Typography>
            <ButtonWhite
                fullWidth
                variant="contained"
                onClick={() => {
                    window.location.href = '/auth/login';
                }}
            >
                Ir para login
            </ButtonWhite>
        </Box>
    )
}

export default SuccessRecovery