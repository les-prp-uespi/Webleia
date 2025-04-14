import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { FiArrowLeft } from "react-icons/fi"
import { BackButton } from "./styles"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useConfirmModal, useService } from "app/shared/hooks"
import { updateTexto } from "app/services/texto"
import ConfirmFinishContent from "./ConfirmFinishContent"
import { clearCache } from "app/redux/reducers/cacheSlice"

const CreateTextHeader = ({ step, isValid }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const confirmModal = useConfirmModal()
    const { selectedTexto } = useSelector(state => state.texto)


    const { request: requestUpdateTexto, response: responseUpdate } = useService(updateTexto, {
        onSuccess: () => {
            confirmModal.hideConfirmModal()
            dispatch(clearCache("buscaListaTextos"))
            navigate("/")
        }
    })

    const handleFinish = async () => {

        const confirmed = await confirmModal.openConfirmModal({
            title: "Finalizar texto",
            loader: true,
            message: (
                <ConfirmFinishContent
                    texto={selectedTexto}
                />
            )
        })

        if (!confirmed) return;

        requestUpdateTexto({
            id: selectedTexto.id,
            texto: selectedTexto.texto,
            status: '2'
        })
    }

    const handleBackButton = () => {
        navigate("/")
    }

    const isLoading = responseUpdate.loading
    return (
        <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
            <Box display='flex' alignItems='center'>
                <BackButton onClick={handleBackButton}>
                    <FiArrowLeft />
                </BackButton>
                <Box ml="20px">
                    <Typography variant="h4">Produção de texto</Typography>
                    <Typography>{selectedTexto.genero_textual.nome}</Typography>
                </Box>
            </Box>
            {step === 2 && <Button disabled={isLoading || !isValid} onClick={handleFinish} sx={{ minWidth: '140px' }} variant="contained">
                {isLoading ? (
                    <CircularProgress size="20px" />
                ) : "FINALIZAR TEXTO"}
            </Button>}
        </Box>
    )
}

export default CreateTextHeader