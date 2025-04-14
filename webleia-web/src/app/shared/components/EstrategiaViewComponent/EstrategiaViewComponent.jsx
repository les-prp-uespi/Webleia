import { AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { StyledAccordion } from './styles';
import { FiArrowDown, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Theme } from 'app/shared/utils';

const EstrategiaViewComponent = ({
  categorias = [],
  selectedPergunta,
  onClickPergunta,
  respostas,
}) => {
  return (
    <>
      <Typography variant="caption">* Questões obrigatórias</Typography>
      {categorias.map((categoria) => {
        return (
          <StyledAccordion
            defaultExpanded={categoria.id === selectedPergunta.categoria_pergunta_id}
            disableGutters
            key={categoria.id}
            elevation={0}
          >
            <AccordionSummary sx={{ background: categoria.cor }} expandIcon={<FiArrowDown />}>
              <Typography fontSize="14px" fontWeight="bold">
                {categoria.nome}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: '0px' }}>
              {categoria.perguntas.map((pergunta) => {
                const hasResposta = !!respostas?.[pergunta.id]?.answered;
                const obrigatorio = pergunta.obrigatorio === '1';
                return (
                  <Box
                    onClick={() => onClickPergunta(pergunta.id)}
                    sx={{ cursor: 'pointer' }}
                    key={`pergunta-${pergunta.id}`}
                    bgcolor={selectedPergunta.id === pergunta.id ? 'whitesmoke' : 'white'}
                    display="flex"
                    width="100%"
                    p="5px 0px"
                    alignItems="center"
                    borderTop={`1px solid ${Theme.colors.gray.ligth}`}
                  >
                    <div style={{ marginLeft: 10 }}>
                      {hasResposta ? <FiCheckCircle /> : <FiCircle ml="10px" />}
                    </div>
                    <Box ml="10px" width="100%" display="flex" flexDirection="column">
                      <Typography fontSize="14px">
                        {`${obrigatorio ? '* ' : ''}${pergunta.titulo}`}
                      </Typography>
                    </Box>
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

export default EstrategiaViewComponent;
