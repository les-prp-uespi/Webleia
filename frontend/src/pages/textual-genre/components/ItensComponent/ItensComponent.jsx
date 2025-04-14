import { Box, Button, Checkbox, IconButton, Radio, TextField, Typography } from "@mui/material"
import { TextoPerguntaTypes } from "app/shared/constants"
import { MdAdd, MdDelete } from "react-icons/md"

const ItensComponent = ({ itens = [], setItens, tipo }) => {

    const handleChange = (value, id) => {
        setItens(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        descricao: value
                    }
                }
                return item
            })
        })
    }

    const handleAddNew = () => {
        const newOption = {
            id: `${new Date().getTime()}-new`,
            descricao: `Alternativa ${itens.length + 1}`
        }
        setItens(prev => [...prev, newOption])
    }

    const handleDelete = (id) => {
        setItens(prev => prev.filter(item => item.id !== id))
    }

    return (
        <Box width='100%' display='flex' mt="10px" flexDirection='column'>
            <Typography fontSize='14px' fontWeight='bold' mb="5px">Alternativas:</Typography>
            {itens.map((item, index) => {
                return (
                    <Box display='flex' alignItems={'center'} key={index} mb="5px">
                        {tipo === TextoPerguntaTypes.RADIO && <Radio disabled />}
                        {tipo === TextoPerguntaTypes.CHECKBOX && <Checkbox disabled checked />}
                        <TextField
                            fullWidth
                            size="small"
                            value={item.descricao}
                            onChange={e => handleChange(e.target.value, item.id)}
                        />
                        <IconButton onClick={() => handleDelete(item.id)} sx={{ ml: 1 }}>
                            <MdDelete />
                        </IconButton>
                    </Box>
                )
            })}
            <Button onClick={handleAddNew} sx={{ mt: 1 }}>
                <Box display='flex' alignItems={'center'}>
                    <Typography>Nova alternativa</Typography>
                    <MdAdd size='18px' />
                </Box>
            </Button>
        </Box>
    )
}

export default ItensComponent