import { Box, Button, CircularProgress, Typography, } from "@mui/material"
import { updateTextoFinal } from "app/redux/reducers/textoSlice"
import { updateTexto } from "app/services/texto"
import { RichTextComponent } from "app/shared/components"
import { useConfirmModal, usePreventChangeRoute, usePreventCloseWindow, useService } from "app/shared/hooks"
import { removeTags } from "app/shared/utils"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toastr from 'toastr';

const FinalAjustsStep = () => {
    const confirmModal = useConfirmModal()
    const dispatch = useDispatch()
    const { respostas, selectedTexto } = useSelector(state => state.texto)
    const [rerender, forceRerender] = useState(0)
    const [texto, setTexto] = useState(selectedTexto.texto || Array(5).fill("<br/>").join(''))
    const [numPlavras, setNumPalavras] = useState(Number(selectedTexto.num_palavras))
    const isDirty = useRef(false)
    usePreventCloseWindow(isDirty)
    usePreventChangeRoute(isDirty)

    const getUpdatedAtDate = () => {
        const date = new Date(selectedTexto.updated_at);
        const dateFromater = new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "long",
            timeStyle: 'short',
            timeZone: "america/sao_paulo",
        });
        return dateFromater.format(date)
    }

    const { request: requestUpdateTexto, response: responseUpdate } = useService(updateTexto, {
        onSuccess: (data) => {
            isDirty.current = false
            toastr.success("Texto salvo com sucesso!");
            dispatch(updateTextoFinal({ texto, num_palavras: data.num_palavras, updated_at: data.updated_at }))
        }
    })

    const handleChange = ({ html, counters }, firstCheck) => {
        setTexto(html)
        setNumPalavras(counters.words)
        if (firstCheck) return;
        isDirty.current = true
    }


    const handleSaveTexto = () => {
        requestUpdateTexto({
            id: selectedTexto.id,
            texto: texto
        })
    }

    const handleGenerate = async () => {
        // Verifica se o texto atual é válido e remove tags antes de continuar
        if (selectedTexto.texto && removeTags(selectedTexto.texto).length > 0) {
            const confirmed = await confirmModal.openConfirmModal({
                title: "Gerar texto final",
                message: (
                    <Box width="100%">
                        <Typography>Deseja gerar texto a partir das respostas selecionadas no passo anterior?</Typography>
                        <Typography fontWeight="bold">Obs: O texto final atual será atualizado</Typography>
                    </Box>
                ),
            });
    
            if (!confirmed) return;
        }
    
        // Garante que `respostas` e `selectedTexto.genero_textual.perguntas` são objetos válidos
        if (!respostas || typeof respostas !== "object") {
            console.error("Respostas inválidas ou inexistentes");
            return;
        }
    
        if (!selectedTexto?.genero_textual?.perguntas || !Array.isArray(selectedTexto.genero_textual.perguntas)) {
            console.error("Perguntas inválidas ou inexistentes no gênero textual");
            return;
        }
    
        // Obtém os IDs das perguntas que possuem respostas no objeto `respostas`
        const perguntasIds = Object.keys(respostas).map(String); // Garante que os IDs são strings
    
        // Filtra os IDs das perguntas permitidas (onde `resposta_texto_final === '1'`)
        const perguntasIdPermitidas = selectedTexto.genero_textual.perguntas
            .filter(pergunta => String(pergunta.resposta_texto_final) === "1") // Normaliza para comparar como string
            .map(pergunta => String(pergunta.id)); // Garante que os IDs são strings
    
        // Interseção entre IDs das perguntas permitidas e IDs das respostas existentes
        const perguntasIdPermitidasComResposta = perguntasIds.filter(id => perguntasIdPermitidas.includes(id));
    
        // Geração do texto final com base nas respostas válidas
        const finalTexto = perguntasIdPermitidasComResposta
            .filter(perguntaId => {
                const resposta = respostas[perguntaId]; // Obtém a resposta para o ID atual
                return resposta?.checked && resposta?.answered; // Garante que ambos os valores são verdadeiros
            })
            .map(perguntaId => respostas[perguntaId]?.text || "") // Evita erros de acesso a `text`
            .join(""); // Concatena todas as respostas em uma string
    
        // Define o texto final no estado e força o rerender
        setTexto(finalTexto);
        forceRerender(prev => prev + 1);
    };

    const isLoading = responseUpdate.loading
    return (
        <Box height='100%'>          
            <Typography textAlign='right' variant="h6">Total último texto salvo: {selectedTexto.num_palavras} palavras</Typography>

            { selectedTexto?.texto && 
            <Typography textAlign='right' fontSize="12px">
                <b>Atualizado em:</b> {getUpdatedAtDate()}
            </Typography> }

            <Button onClick={handleGenerate} sx={{ mb: "20px" }} variant="outlined">Gerar texto</Button>
            <RichTextComponent key={rerender} defaultValue={texto} onChange={handleChange} />
            <Button
                onClick={handleSaveTexto}
                variant="contained"
                disabled={isLoading}
                sx={{ mt: '10px', minWidth: '140px' }}>
                {isLoading ? (
                    <CircularProgress size="20px" />
                ) : "SALVAR INFORMAÇÕES"}
            </Button>
        </Box>
    )
}

export default FinalAjustsStep