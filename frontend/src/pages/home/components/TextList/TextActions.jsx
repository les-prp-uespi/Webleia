import { Alert, Box, Grid2, Typography } from "@mui/material";
import { deleteTexto, duplicateTexto, exportTexto } from "app/services/texto";
import { TableActionButton } from "app/shared/components";
import { TextoFileTypes, TextoFileTypesProps, TextoStatus, TextoStatusProps } from "app/shared/constants";
import { useConfirmModal, useService } from "app/shared/hooks";
import { FiCopy, FiEdit2, FiTrash } from "react-icons/fi"
import { BsFiletypeDocx, BsFiletypePdf } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

const TextActions = ({ texto, getTextos, canEdit }) => {
    const navigate = useNavigate()
    const confirmModal = useConfirmModal()

    const { request: requestDeleteTexto } = useService(deleteTexto, {
        onSuccess: () => {
            confirmModal.hideConfirmModal()
            getTextos(true)
        },
        onError: () => {
            confirmModal.hideConfirmModal()
        }
    })

    const { request: requestDuplicateTexto } = useService(duplicateTexto, {
        onSuccess: () => {
            confirmModal.hideConfirmModal()
            getTextos(true)
        },
        onError: () => {
            confirmModal.hideConfirmModal()
        }
    })

    const { request: requestExportTexto } = useService(exportTexto, {
        onSuccess: (data) => {
            const isPdf = data.type === 'application/pdf'
            saveAs(data, isPdf ? "texto.pdf" : "texto.docx")
            confirmModal.hideConfirmModal()
        },
        onError: () => {
            confirmModal.hideConfirmModal()
        }
    })

    const handleDelete = async (texto) => {
        const confirmed = await confirmModal.openConfirmModal({
            title: "Remover Texto",
            loader: true,
            message: (
                <Box display='flex' flexDirection='column'>
                    <Typography fontSize="16px" fontWeight='bold'>Confirma a remoção do texto?</Typography>
                    <Typography fontSize="14px" fontWeight='bold' mt="2px">Nome:</Typography>
                    <Typography fontSize="16px">{texto.titulo}</Typography>
                    <Typography fontSize="14px" fontWeight='bold' mt="2px">Gênero:</Typography>
                    <Typography fontSize="16px">{texto.genero_textual.nome}</Typography>
                    <Typography fontSize="14px" fontWeight='bold' mt="2px">Status:</Typography>
                    <Typography fontSize="16px">{TextoStatusProps[texto.status].text}</Typography>
                </Box>
            )
        })
        if (!confirmed) return;

        await requestDeleteTexto({ id: texto.id })
        confirmModal.hideConfirmModal()
        getTextos(true)
    }

    const handleDuplicate = async () => {
        const confirmed = await confirmModal.openConfirmModal({
            title: "Duplicar texto selecionado",
            loader: true,
            message: (
                <Box display='flex' flexDirection='column'>
                    <Typography fontSize="16px" fontWeight='bold'>
                        Confirma a duplicação do texto?
                    </Typography>
                    <Typography fontSize="14px" mt="7px">
                        <b>Nome:</b> {texto.titulo}
                    </Typography>
                    <Typography fontSize="14px" mt="7px">
                        <b>Gênero:</b> {texto.genero_textual.nome}
                    </Typography>
                    <Typography fontSize="14px" my="7px">
                        <b>Status:</b> {TextoStatusProps[texto.status].text}
                    </Typography>
                    <Alert color="info">
                        <Typography fontSize='16px' fontWeight='bold'>Importante</Typography>
                        <Typography fontSize='14px'>Ao duplicar o texto, será criado uma cópia com o status de "em andamento" independente do status do texto que foi selecionado.</Typography>
                    </Alert>
                </Box>
            )
        })
        if (!confirmed) return;

        await requestDuplicateTexto({ id: texto.id })

    }

    const handleDownload = async (fileType = TextoFileTypes.PDF) => {
        const confirmed = await confirmModal.openConfirmModal({
            title: "Realizar download!",
            loader: true,
            message: (
                <Box display='flex' flexDirection='column'>
                    <Typography fontSize="16px" fontWeight='bold'>
                        Confirma download do texto?
                    </Typography>
                    <Typography fontSize="14px" mt="7px">
                        <b>Tipo de arquivo:</b> {TextoFileTypesProps[fileType].text}
                    </Typography>
                </Box>
            )
        })
        if (!confirmed) return;

        const isDocx = fileType === TextoFileTypes.PDF ? 0 : 1
        await requestExportTexto({ id: texto.id, docx: isDocx })

    }

    if (TextoStatus.CONCLUIDO === Number(texto.status)) {
        return (
            <Grid2 container spacing={1}>
                <TableActionButton
                    onClick={() => handleDownload(TextoFileTypes.DOCX)}
                >
                    <BsFiletypeDocx />
                </TableActionButton>

                <TableActionButton
                    onClick={() => handleDownload(TextoFileTypes.PDF)}
                >
                    <BsFiletypePdf />
                </TableActionButton>
                
                { canEdit && <TableActionButton
                    onClick={handleDuplicate}
                >
                    <FiCopy />
                </TableActionButton> }
            </Grid2 >
        )
    }

    if(!canEdit) return null

    return (
        <Grid2 container spacing={1}>
            <TableActionButton
                onClick={() => {
                    navigate(`/texto/${texto.id}/${texto.genero_textual_id}`)
                }}
            >
                <FiEdit2 />
            </TableActionButton>
            <TableActionButton
                onClick={() => handleDelete(texto)}
            >
                <FiTrash />
            </TableActionButton>
            {TextoStatus.EM_ANDAMENTO === Number(texto.status) && <TableActionButton
                onClick={handleDuplicate}
            >
                <FiCopy />
            </TableActionButton>}
        </Grid2> 
    )
}

export default TextActions