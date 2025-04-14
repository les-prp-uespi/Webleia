import { Box, Typography } from "@mui/material"
import { Theme } from "app/shared/utils";
import { ButtonWhite } from "pages/auth/styles";

const SuccessRegistration = () => {
    return (
        <Box padding='10px'>
            <Typography variant="h4" textAlign='center' color={Theme.colors.green}>Cadastro realizado com sucesso!</Typography>
            <Typography my="10px" textAlign='center'>Para prosseguir, será enviado um link de ativação para seu email.</Typography>
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

export default SuccessRegistration