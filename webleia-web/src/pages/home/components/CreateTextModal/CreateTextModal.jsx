import { FormControl, Grid2, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { clearCache } from "app/redux/reducers/cacheSlice"
import { buscaGenerosTextuais } from "app/services/genero"
import { saveTexto } from "app/services/texto"
import { GenericModal, LoaderComponent, NumberInput } from "app/shared/components"
import { useService } from "app/shared/hooks"
import { Theme } from "app/shared/utils"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import toastr from 'toastr';

const CreateTextModal = ({ open, onClose }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [titulo, setTitulo] = useState('')
    const [tipo, setTipo] = useState(-1)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const { request, response, retry } =
        useService(buscaGenerosTextuais, {
            cache: true,
            cacheKey: "generosTextuaisFiltro",
        })

    const generosList = response?.data?.data || []
    const selectedTipo = generosList.find(genero => Number(genero.id) === tipo)
    const canUseMinMax = selectedTipo?.use_min_max === "1"

    const {
        request: saveTextoRequest,
        response: responseSave
    } = useService(saveTexto, {
        onSuccess: (novoTexto) => {
            dispatch(clearCache("buscaListaTextos"))
            navigate(`/texto/${novoTexto.id}/${tipo}`)
        }
    })

    useEffect(() => {
        request({
            publicado: '1'
        })
    }, [])

    const handleChangeTipo = (newTipo) => {
        const newSelectedTipo = generosList.find(genero => Number(genero.id) === newTipo)
        setTipo(newTipo)
        if (newTipo !== -1) {
            setMin(Number(newSelectedTipo.min_palavras))
            setMax(Number(newSelectedTipo.max_palavras))
        }
    }


    const handleConfirm = () => {
        const minMaxParams = {
            min_palavras: min,
            max_palavras: max
        }

        if (max <= 0) {
            toastr.warning("O número máximo deve ser maior que zero.")
            return;
        }
        if (min > max) {
            toastr.warning("O número máximo deve ser maior que o número mínimo.")
            return;
        }
        saveTextoRequest({
            titulo,
            genero_textual_id: tipo,
            ...minMaxParams
        })
    }

    const isValid = titulo.trim().length > 3 && tipo !== -1


    return (
        <GenericModal
            open={open}
            onClose={onClose}
            size="sm"
            hasCloseIcon={false}
            preventCloseClickOutside
            title="Produção de texto"
            actions={[
                {
                    label: "Cancelar",
                    color: "inherit",
                    onClick: onClose,
                },
                {
                    label: "Confirmar",
                    disabled: !isValid,
                    loading: responseSave.loading,
                    onClick: handleConfirm
                }
            ]}
        >
            <LoaderComponent
                {...response}
                retry={retry}
                message="Buscando gêneros textuais..."
                errorMessage="Falha ao buscar gêneros textuais"
            >
                <TextField
                    fullWidth
                    size="small"
                    name="search"
                    label="Título"
                    variant="outlined"
                    sx={{ mb: '10px' }}
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />


                {selectedTipo && (
                    <>
                        <Typography color={Theme.colors.black} fontWeight='500' sx={{ my: '10px' }}>
                            Informe mínimo e máximo de palavras:
                        </Typography>
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <NumberInput
                                    fullWidth
                                    size="small"
                                    disabled={!canUseMinMax}
                                    name="search"
                                    placeholder="Mínimo"
                                    variant="outlined"
                                    value={min}
                                    onChange={(event, val) => setMin(val)}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <NumberInput
                                    fullWidth
                                    size="small"
                                    name="search"
                                    disabled={!canUseMinMax}
                                    placeholder="Máximo"
                                    variant="outlined"
                                    value={max}
                                    onChange={(event, val) => setMax(val)}
                                />
                            </Grid2>
                        </Grid2>
                    </>
                )}

                <Typography color={Theme.colors.black} fontWeight='500' sx={{ mb: '10px' }}>Seleção do gênero a ser produzido:</Typography>
                <FormControl fullWidth>
                    <InputLabel id="genero-label">Tipo</InputLabel>
                    <Select
                        labelId="genero-label"
                        id="genero"
                        name="genero"
                        input={<OutlinedInput label="Tipo" />}
                        sx={{ height: 40 }}
                        value={tipo}
                        onChange={e => handleChangeTipo(e.target.value)}
                    >

                        <MenuItem
                            value={-1}
                        >
                            Selecione um tipo
                        </MenuItem>

                        {generosList.map(genero => {
                            return (
                                <MenuItem
                                    key={genero.id}
                                    value={Number(genero.id)}
                                >
                                    {genero.nome}
                                </MenuItem>
                            )
                        })}

                    </Select>
                </FormControl>
                <Typography
                    color={Theme.colors.black}
                    mt="10px"
                >
                    <div dangerouslySetInnerHTML={{ __html: selectedTipo?.descricao }}></div>
                </Typography>
            </LoaderComponent>
        </GenericModal>
    )
}

export default CreateTextModal