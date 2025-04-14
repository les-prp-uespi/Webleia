import { Chip, Grid2 } from '@mui/material';
import { DescriptionCardQuestion, LabelCardQuestion } from './style';

const QuestionContent = ({ titulo, isRequired, isFinalText }) => {
  return (
    <>
      <Grid2 size={12} flexDirection={'row'}>
        {isRequired && <Chip label="Obrigatório" color="error" />}
        {isFinalText && (
          <Chip
            style={{
              marginLeft: 5,
            }}
            label="Resposta pode ser usada no texto final "
            color="secondary"
          />
        )}
      </Grid2>
    </>
  );
};

export default QuestionContent;
