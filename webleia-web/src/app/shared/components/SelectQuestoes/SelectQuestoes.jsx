import { AccordionDetails, AccordionSummary, Box, Checkbox, Typography } from "@mui/material";
import { StyledAccordion } from "./styles";
import { FiArrowDown } from "react-icons/fi";
import { Theme } from "app/shared/utils";

const SelectQuestoes = ({ onChange, categorias = [], selecteds = [], respostas = {} }) => {
    const handleParentClick = (categoria) => (e, checked) => {
        e.stopPropagation();

        const ids = categoria.perguntas
            .filter(pergunta => String(pergunta.resposta_texto_final) === '1')
            .filter(pergunta => respostas?.[String(pergunta.id)]) 
            .filter(pergunta => Boolean(respostas?.[String(pergunta.id)]?.answered)) 
            .map(pergunta => String(pergunta.id))
        onChange(checked, ids);
    };

    const handleQuestionClick = (perguntaId) => (e, checked) => {
        e.stopPropagation();
        onChange(checked, [String(perguntaId)]); // Normaliza o ID como string
    };

    const getIsAllClick = (categoria) => {
        return categoria.perguntas.every(pergunta => selecteds.includes(String(pergunta.id))); // Compara strings consistentemente
    };

    const getIsSomeClick = (categoria) => {
        return categoria.perguntas.some(pergunta => selecteds.includes(String(pergunta.id))); // Compara strings consistentemente
    };

    const nenhumaResposta = (categoria) => {
        return categoria.perguntas.every(pergunta => !respostas?.[String(pergunta.id)]); // Verifica se não há respostas para a categoria
    };

    return (
        <>
            {categorias.map(categoria => {
                const isAllChecked = getIsAllClick(categoria);
                return (
                    <StyledAccordion key={String(categoria.id)} disableGutters disabled={nenhumaResposta(categoria)}>
                        <AccordionSummary expandIcon={<FiArrowDown />}>
                            <Box display="flex" alignItems="center">
                                <Checkbox
                                    indeterminate={getIsSomeClick(categoria) && !isAllChecked}
                                    checked={isAllChecked}
                                    disabled={nenhumaResposta(categoria)}
                                    onChange={handleParentClick(categoria)}
                                />
                                <Typography fontSize="14px" fontWeight="bold">{categoria.nome}</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: "0px" }}>
                            {categoria.perguntas.map(pergunta => {
                                const perguntaId = String(pergunta.id); // Normaliza ID como string
                                const isAnswered = Boolean(respostas?.[perguntaId]?.answered); // Garante booleano

                                return (
                                    <Box
                                        display="flex"
                                        width="100%"
                                        p="5px 0px"
                                        pl="50px"
                                        alignItems="center"
                                        key={`pergunta-${perguntaId}`}
                                        borderTop={`1px solid ${Theme.colors.gray.ligth}`}
                                    >
                                        <Checkbox
                                            disabled={!isAnswered} // Desabilita caso não esteja respondida
                                            checked={selecteds.includes(perguntaId)} // Compara strings
                                            onChange={handleQuestionClick(perguntaId)}
                                        />
                                        <Typography fontSize="14px">
                                            {pergunta.titulo}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </AccordionDetails>
                    </StyledAccordion>
                );
            })}
        </>
    );
};

export default SelectQuestoes;
