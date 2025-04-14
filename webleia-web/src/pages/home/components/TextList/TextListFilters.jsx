import { FormControl, Grid2, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { setTextoFiltro } from "app/redux/reducers/textoSlice";
import { buscaGenerosTextuais } from "app/services/genero";
import { LoaderComponent } from "app/shared/components";
import { TextoStatus, TextoStatusProps } from "app/shared/constants";
import { useService } from "app/shared/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const TextListFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.texto.filters);

    const { request: requestGeneros, response: responseGeneros, retry: retryGeneros } =
        useService(buscaGenerosTextuais, {
            cache: true,
            cacheKey: "generosTextuaisFiltro",
        })

    useEffect(() => {
        requestGeneros({
            publicado: '1'
        })
    }, [])

    const handleChange = (event) => {
        const {
            target: { value, name },
        } = event;

        dispatch(setTextoFiltro({ [name]: value }))
    }

    const generosList = responseGeneros?.data?.data || []

    return (
        <Grid2 container mt="20px" spacing={2}>
            <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                <LoaderComponent
                    {...responseGeneros}
                    retry={retryGeneros}
                    message="Buscando gêneros textuais..."
                    errorMessage="Falha ao buscar gêneros textuais"
                >
                    <FormControl fullWidth>
                        <InputLabel id="genero-label">Gênero textual</InputLabel>
                        <Select
                            labelId="genero-label"
                            id="genero_textual_id"
                            name="genero_textual_id"
                            value={filters.genero_textual_id}
                            onChange={handleChange}
                            input={<OutlinedInput label="Gênero textual" />}
                            sx={{ height: 40 }}
                        >

                            <MenuItem
                                value={-1}
                            >
                                Todos
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
                </LoaderComponent>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="genero-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={handleChange}
                        input={<OutlinedInput label="status" />}
                        sx={{ height: 40 }}
                    >

                        <MenuItem
                            value={-1}
                        >
                            Todos
                        </MenuItem>
                        {Object.values(TextoStatus).map(status => {
                            return (
                                <MenuItem
                                    key={status}
                                    value={status}
                                >
                                    {TextoStatusProps[status].text}
                                </MenuItem>
                            )
                        })}

                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                <TextField
                    fullWidth
                    size="small"
                    name="titulo"
                    label="Buscar por nome"
                    placeholder="Buscar por nome"
                    variant="outlined"
                    value={filters.titulo}
                    onChange={handleChange}
                />
            </Grid2>
        </Grid2 >
    )
}

export default TextListFilters