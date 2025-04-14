import { Alert, Box, Button, CircularProgress, Grid2, Typography, useMediaQuery, useTheme } from "@mui/material"
import { EstrategiaViewComponent, NumberInput, RichTextComponent } from "app/shared/components";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmModal, usePreventChangeRoute, usePreventCloseWindow, useService } from "app/shared/hooks";
import { savePergunta } from "app/services/pergunta";
import { updatePergunta } from "app/services/pergunta/put";
import { useParams } from "react-router-dom";
import { setResposta } from "app/redux/reducers/textoSlice";
import { groupPerguntasByCategoria } from "app/shared/utils";
import { clearCache } from "app/redux/reducers/cacheSlice";
import QuestionMultipleChoice from "./QuestionMultipleChoice";
import { TextoPerguntaTypes } from "app/shared/constants";

const TextAnswerStep = () => {
    const theme = useTheme();
    const params = useParams()
    const dispatch = useDispatch()
    const confirmModal = useConfirmModal()
    const textId = params.id
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { perguntas, respostas } = useSelector(state => state.texto)
    const [stepPergunta, setStepPergunta] = useState(0)
    const [text, setText] = useState('<div />')
    const [multipleChoiceResposta, setMultipleChoiceResposta] = useState('')
    const isLastPergunta = stepPergunta === perguntas.length - 1
    const selectedPergunta = perguntas[stepPergunta]
    const isDirty = useRef(false)

    const isMultipleChoice = [
        TextoPerguntaTypes.RADIO,
        TextoPerguntaTypes.CHECKBOX
    ].includes(selectedPergunta?.tipo + '')

    usePreventCloseWindow(isDirty)
    usePreventChangeRoute(isDirty)

    const onSaveOrUpdateResposta = async (data) => {
        isDirty.current = false
        dispatch(setResposta({
            perguntaId: selectedPergunta.id,
            resposta: data,
            resposta_texto_final: selectedPergunta.resposta_texto_final
        }))

        const confirmed = await confirmModal.openConfirmModal({
            title: "Sua resposta foi enviada com sucesso!",
            message: (
                <>
                    {selectedPergunta.exemplo && selectedPergunta.exemplo !== "<p></p>" ? (
                        <Alert severity="info">
                            <Typography>
                                <div dangerouslySetInnerHTML={{ __html: selectedPergunta.exemplo }}></div>
                            </Typography>
                        </Alert>
                    ) : (
                        <Typography>
                            Resposta salva com sucesso.
                        </Typography>
                    )}
                </>
            )
        })

        if (!confirmed) return;
        handleNextPergunta()
    }

    const { request: requestSavePergunta, response: responseSave } = useService(savePergunta, {
        onSuccess: onSaveOrUpdateResposta
    })
    const { request: requestUpdatePergunta, response: responseUpdate } = useService(updatePergunta, {
        onSuccess: onSaveOrUpdateResposta
    })

    const handleClickPergunta = async (perguntaId) => {
        if (isDirty.current) {
            const confirmed = await confirmModal.openConfirmModal({
                title: "Atenção!",
                message: "Você não salvou a resposta digitada, tem certeza que deseja mudar de questão?"
            })

            if (!confirmed) return;
        }
        isDirty.current = false
        const resposta = respostas?.[perguntaId]?.text || ""
        setText(resposta)
        const position = perguntas.findIndex(pergunta => pergunta.id === perguntaId)
        setStepPergunta(position)
    }

    const handleNextPergunta = () => {
        if (isLastPergunta) {
            return; //IR PARA PRÓXIMO STEP GERAL
        }
        setStepPergunta(prev => prev + 1)
    }

    const loadPerguntaDados = () => {
        if (perguntas.length > 0) {
            const proximaPergunta = perguntas[stepPergunta]
            const resposta = respostas?.[proximaPergunta.id]?.text || ""
            setText(resposta)
            setMultipleChoiceResposta(resposta)
        }
    }

    useEffect(() => {
        loadPerguntaDados()
    }, [stepPergunta, perguntas])

    const handleChangeText = (value, firstCheck) => {
        setText(value.html)
        if (firstCheck) return;
        isDirty.current = true
    }

    const handleChangeNumber = (value) => {
        setText(value)
        isDirty.current = true
    }

    const handleChangeMultipleChoice = (value) => {
        isDirty.current = true;
        setMultipleChoiceResposta(value)
    }

    const handleSaveResposta = () => {
        const currentResposta = respostas?.[selectedPergunta.id]
        dispatch(clearCache("buscaListaTextos"))
        if (currentResposta) {
            return requestUpdatePergunta({
                resposta: isMultipleChoice ? multipleChoiceResposta : text,
                id: currentResposta.respostaId,
                resposta_id: currentResposta.respostaId,
            })
        }
        requestSavePergunta({
            resposta: isMultipleChoice ? multipleChoiceResposta : text,
            producao_textual_id: textId,
            pergunta_id: selectedPergunta.id
        })

    }

    const totalPalavrasRespondidas = useMemo(() => {
        const respostasArr = Object.values(respostas)
        let sum = 0
        respostasArr.forEach(resposta => {
            sum = sum + resposta.num_palavras
        })
        return sum || 0
    }, [respostas])


    if (!perguntas.length) return null
    const isLoading = responseSave.loading || responseUpdate.loading


    return (
        <>
            <Typography textAlign='right' variant="h6">Total respondidas: {totalPalavrasRespondidas} palavras</Typography>
            <Grid2 container sx={{ mt: 2 }} width='100%' spacing={4} >
                <Grid2
                    height='fit-content'
                    size={{ xs: 12, sm: 12, md: 3 }}
                >
                    <EstrategiaViewComponent
                        key={selectedPergunta.id}
                        categorias={groupPerguntasByCategoria(perguntas)}
                        respostas={respostas}
                        selectedPergunta={selectedPergunta}
                        onClickPergunta={handleClickPergunta}
                    />
                </Grid2>
                <Grid2
                    height='fit-content'
                    paddingLeft="10px"
                    size={{ xs: 12, sm: 12, md: isMobile ? 12 : 9 }}
                >
                    <Box width='100%' borderRadius="4px" padding='5px 10px' mb="10px" sx={{ background: `linear-gradient(0deg, ${selectedPergunta.categoria_pergunta.cor} 37%, rgba(255,255,255,1) 100%)` }}>
                        <Typography fontWeight='500' variant="h5">{selectedPergunta.categoria_pergunta.nome}</Typography>
                        <Typography variant="caption">
                            <span dangerouslySetInnerHTML={{ __html: selectedPergunta.categoria_pergunta.descricao }} />
                        </Typography>

                        <Typography mb="10px" fontSize="14px" fontWeight='bold'>{selectedPergunta.titulo}</Typography>
                        <Typography fontSize="14px" mb="10px" fontWeight='bold'>
                            <span dangerouslySetInnerHTML={{ __html: selectedPergunta.descricao }} />
                        </Typography>
                    </Box>
                    {selectedPergunta.tutorial && selectedPergunta.tutorial !== "<p></p>" && <Alert color="info" sx={{ mb: '10px' }}>
                        <Typography>
                            <span dangerouslySetInnerHTML={{ __html: selectedPergunta.tutorial }} />
                        </Typography>
                    </Alert>}

                    {selectedPergunta.tipo + '' === TextoPerguntaTypes.TEXT  && (
                        <RichTextComponent
                            key={selectedPergunta.id}
                            defaultValue={respostas?.[selectedPergunta.id]?.text}
                            onChange={handleChangeText}
                        />
                    )}
                    {selectedPergunta.tipo + '' === TextoPerguntaTypes.NUMBER && (
                        <NumberInput
                            fullWidth
                            size="small"
                            defaultValue={respostas?.[selectedPergunta.id]?.text || 0}
                            variant="outlined"
                            onChange={(event, val) => handleChangeNumber(val)}
                        />
                    )}

                    {isMultipleChoice && 
                        <QuestionMultipleChoice
                            pergunta={selectedPergunta}
                            multipleRespostas={respostas?.[selectedPergunta.id]?.text}
                            onChange={handleChangeMultipleChoice}
                        />
                    }
                    <br />
                    <Button
                        onClick={handleSaveResposta}
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: '10px', minWidth: '140px' }}>
                        {isLoading ? (
                            <CircularProgress size="20px" />
                        ) : "SALVAR RESPOSTA"}
                    </Button>
                </Grid2>
            </Grid2>
        </>
    )
}

export default TextAnswerStep