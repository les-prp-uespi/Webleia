import { Grid2 } from "@mui/material"
import UserProfile from "./components/UserProfile/UserProfile"
import { TextList } from "./components"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useService } from "app/shared/hooks"
import { buscaAluno } from "app/services/auth"

const HomePage = () => {
    const { id } = useParams() // aluno id

    // The request is make here because both components needs the data
    const { request: requestBuscaAluno, response: responseAluno } = useService(buscaAluno, {
        cache: true,
        cacheKey: 'buscaAluno'
    })

    useEffect(() => {
        if(id){ 
            requestBuscaAluno(
                {id, with: "grau_instrucao,instituicao_ensino,usuario"},
                {ignoreCache: false, cancelPrevious: true }
            )
        } 
    }, [])

    return (
        <Grid2 container spacing={2}>
            <Grid2
                size={{ xs: 12, sm: 4, md: 3 }}
                minHeight={ id ? '300px' : '270px'}
                height='fit-content'
                borderRadius="4px"
                border="1px solid #CDCDCD"
                padding="20px"
                bgcolor="white"
            >
                <UserProfile responseAluno={responseAluno} id={id} />
            </Grid2>

            <Grid2
                size={{ xs: 12, sm: 8, md: 9 }}
                height="100%"
                borderRadius="4px"
                border="1px solid #CDCDCD"
                padding="20px"
                bgcolor="white"
            >
                <TextList aluno={ responseAluno?.data } id={id} />
            </Grid2>

        </Grid2>
    )
}

export default HomePage