import { Alert, Box, Typography } from "@mui/material"

const ConfirmFinishContent = ({ texto }) => {

    const numPalavrasTextoFinal = Number(texto?.num_palavras) || 0
    const minTexto = Number(texto?.min_palavras) || 0
    const maxTexto = Number(texto?.max_palavras) || 0

    const limiteMinMaxExcedido = numPalavrasTextoFinal >= minTexto || numPalavrasTextoFinal <= maxTexto
    return (
        <Box display='flex' flexDirection='column' gap="10px">
            <Typography fontWeight='bold'>Confirma a finalização do texto criado?</Typography>
            <Typography fontSize='15px'><b>Título:</b>&nbsp; {texto.titulo}</Typography>
            <Typography fontSize='15px'><b>Gênero selecionado:</b>&nbsp;{texto.genero_textual.nome}</Typography>
            <Typography fontSize='15px'><b>Quantidade de palavras:</b>&nbsp;{numPalavrasTextoFinal}</Typography>
            {limiteMinMaxExcedido && <Alert severity="warning">
                <Typography fontWeight='bold'>Atenção</Typography>
                <Typography fontSize='15px' margin='0px'>Número de palavras fora da faixa informada.</Typography>
                <Typography fontSize='15px' margin='0px' mt="10px"><b>Mínimo:</b> {minTexto}</Typography>
                <Typography fontSize='15px' margin='0px'><b>Máximo:</b> {maxTexto}</Typography>
            </Alert>}
            <Alert severity="info" >
                <Typography fontWeight='bold'>Importante</Typography>
                <Typography fontSize='15px' margin='0px'>Antes de finalizar, verifique se seu texto:</Typography>
                <ul style={{ marginTop: 0 }}>
                    <li>Está isento de desvios ortográficos;</li>
                    <li>Atende às regras de pontuação;</li>
                    <li>Atende à gramática da norma culta</li>
                    <li>Usa linguagem objetiva, de acordo com a área de conhecimento;</li>
                    <li>Está coeso, com uso adequado de conectivos;</li>
                    <li>É conciso, sem elementos redudantes ou repetitivos.</li>
                </ul>
            </Alert>
        </Box>
    )
}

export default ConfirmFinishContent