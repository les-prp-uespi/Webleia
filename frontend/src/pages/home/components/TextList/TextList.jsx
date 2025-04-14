import { Box, Button, Chip, Grid2, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { Theme } from "app/shared/utils"
import TextListFilters from "./TextListFilters"
import { StyledTableContainer, } from "app/shared/components/Table"
import { LoaderComponent, TextoStatusComponent } from "app/shared/components"
import { useEffect, useState } from "react"
import CreateTextModal from "../CreateTextModal"
import { useDebounce, useService } from "app/shared/hooks"
import { buscaTextos, } from "app/services/texto"
import { useDispatch, useSelector } from "react-redux"
import { setTextoFiltro } from "app/redux/reducers/textoSlice"
import { formatParams } from "app/shared/helpers"
import TextActions from "./TextActions"
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const TextList = ({ aluno, id }) => { // id from aluno, this cames from route
    const dispatch = useDispatch()
    const filters = useSelector((state) => state.texto.filters)
    const debouncedFilters = useDebounce(filters, 400)
    const [textoModalOpen, setTextoModal] = useState(false)
    const navigate = useNavigate()

    const createText = async () => {
        setTextoModal(true)
    }

    const { request, response, retry } = useService(buscaTextos, {
        cache: true,
        cacheKey: "buscaListaTextos"
    })

    const getTextos = (ignoreCache = false) => {
        // if there's aluno id from route, uses the user id that cames from aluno request
        const usuario_id = id ? { usuario_id: aluno?.usuario.id } : {} 

        if(!id || (id && aluno)){ //if there's not route id just make the request, if not, make the request when aluno is avaliable
            request(
                { ...formatParams(filters), ...usuario_id, limit: 10, with: "genero_textual" },
                { ignoreCache, cancelPrevious: true }
            )
        }
    }

    useEffect(() => {
        getTextos()
    }, [debouncedFilters, aluno])

    const textoList = response?.data?.data || []
    const textoListPageCount = response?.data?.last_page || 0
    const textoListItemsCount = response?.data?.total || 0

    return (
        <Grid2
            display='flex'
            flexDirection='column'
            width='100%'
        >
            <Grid2 container>
                <Grid2 size={{ sm: 12, md: 6 }}>
                    <Typography
                        fontSize='26px'
                        fontWeight='500'
                        color={Theme.colors.black}
                    >
                        Textos criados
                    </Typography>
                    <Typography
                        fontSize='12px'
                        color={Theme.colors.black}
                    >
                        {textoListItemsCount} itens
                    </Typography>
                </Grid2>
                
                <Grid2 size={{ sm: 12, md: 6 }} textAlign='right'>
                    { !id && 
                        <Button onClick={createText} variant="contained">NOVO TEXTO</Button> }
                    { id && 
                        <Button variant="contained" onClick={ () => navigate('/admin') }>  
                            <Box display='flex' alignItems="center" gap={1}>
                                <BsArrowLeft size="20px" /> 
                                <Typography>VOLTAR</Typography>
                            </Box>                          
                        </Button> }
                </Grid2> 

            </Grid2>

            <TextListFilters />

            <LoaderComponent
                {...response}
                message="Buscando produções textutais..."
                errorMessage="Falha ao buscar produções textutais"
                retry={retry}
            >
                <StyledTableContainer sx={{ mt: "20px" }}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell >Nome</TableCell>
                                <TableCell align="left">Tipo</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left"> { !id ? 'Ações' : 'Download' } </TableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {textoList.map(texto => {
                                return (
                                    <TableRow key={texto.id}>
                                        <TableCell align="left" width='300px'>
                                            <Tooltip
                                                title={texto.titulo}
                                                placement="top"
                                                arrow
                                            >
                                                <Typography
                                                    maxWidth='300px'
                                                    fontSize="14px"
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                    whiteSpace='nowrap'
                                                >
                                                    {texto.titulo}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Chip color="primary" size="small" label={texto.genero_textual.nome} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextoStatusComponent status={texto.status} />
                                        </TableCell>

                                        <TableCell align="left">
                                            <TextActions texto={texto} getTextos={getTextos} canEdit={ id ? false : true } />
                                        </TableCell> 
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
                {textoList.length === 0 && !response.loading && <Box display='flex' width="100%" justifyContent='center' padding='10px'>
                    Nenhum texto para ser exibido.
                </Box>}
            </LoaderComponent>
            <Grid2 width="100%">
                {textoListPageCount > 1 && <Pagination
                    count={textoListPageCount}
                    color="primary"
                    shape="rounded"
                    page={filters.page}
                    onChange={(_event, newPage) => {
                        dispatch(setTextoFiltro({ page: newPage }))
                    }}
                    style={{
                        marginTop: 20,
                        padding: 10,
                        float: 'right'
                    }}
                />}
            </Grid2>
            {textoModalOpen && <CreateTextModal
                open={textoModalOpen}
                onClose={() => setTextoModal(false)}
            />}
        </Grid2>
    )
}

export default TextList