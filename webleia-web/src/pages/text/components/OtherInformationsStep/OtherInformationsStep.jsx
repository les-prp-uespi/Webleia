import { Box, Typography } from "@mui/material"
import { updateUsoFinalRespostas } from "app/redux/reducers/textoSlice"
import { saveUsoTextoFinal } from "app/services/resposta"
import { SelectQuestoes } from "app/shared/components"
import { useService } from "app/shared/hooks"
import { getCheckedPerguntasIds, groupPerguntasByCategoria } from "app/shared/utils"
import {  useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const OtherInformationsStep = () => {
    const dispatch = useDispatch()
    const { perguntas, respostas, selectedTexto } = useSelector(state => state.texto)
    const [selecteds, setSelecteds] = useState(getCheckedPerguntasIds(respostas))
    const { request: requestUsoTextoFinal } = useService(saveUsoTextoFinal)

    const handleAddChange = (ids = []) => {
        if(!ids?.length){
            return
        }

        const newArray = [...selecteds]
        ids.forEach(id => {
            if (!newArray.includes(id)) {
                newArray.push(id)
            }
        })

        const respostasIds = ids.map(perguntaId => respostas[perguntaId]?.respostaId)
        dispatch(updateUsoFinalRespostas({
            perguntasIds: ids,
            checked: true
        }))

        requestUsoTextoFinal({
            producao_textual_id: selectedTexto.id,
            usar: 1,
            ids: respostasIds
        })
        setSelecteds(newArray)
    }

    const handlerRemoveChange = (ids) => {
        if(!ids?.length){
            return
        }

        setSelecteds(prev => prev.filter(id => !ids.includes(id)))
        const respostasIds = ids.map(perguntaId => respostas[perguntaId]?.respostaId)
        dispatch(updateUsoFinalRespostas({
            perguntasIds: ids,
            checked: false
        }))
        requestUsoTextoFinal({
            producao_textual_id: selectedTexto.id,
            usar: 0,
            ids: respostasIds
        })
    }

    const totalPalavrasRespondidas = useMemo(() => {
        const respostasArr = Object.values(respostas)
        let sum = 0
        respostasArr.forEach(resposta => {
            if (resposta.checked) {
                sum = sum + resposta.num_palavras
            }
        })
        return sum || 0
    }, [respostas])


    return (
        <Box>

            <Typography textAlign='right' variant="h6">Total selecionadas: {totalPalavrasRespondidas} palavras</Typography>
            <Typography mb="20px" fontWeight='500'>
                Desmarque os itens que NÃO deseja que sejam adicionados ao texto final
            </Typography>

            <SelectQuestoes
                selecteds={selecteds}
                categorias={groupPerguntasByCategoria(perguntas, true)}
                respostas={respostas}
                onChange={(checked, ids) => {
                    if (checked) {
                        handleAddChange(ids)
                        return;
                    }
                    handlerRemoveChange(ids)
                }}
            />
        </Box>
    )
}

export default OtherInformationsStep