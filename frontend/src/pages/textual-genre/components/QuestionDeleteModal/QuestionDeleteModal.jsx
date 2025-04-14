import { Grid2 } from '@mui/material';
import { GenericModal } from 'app/shared/components';
import QuestionContent from '../QuestionContent';
import { DescriptionCardQuestion, LabelCardQuestion, TitleDeleteQuestion } from './style';
import { useService } from 'app/shared/hooks';
import { deletePerguntaGeneroTextual } from 'app/services/pergunta';
import toastr from 'toastr';

const QuestionDeleteModal = ({ open, onClose, pergunta, onSuccess }) => {
  const { request, response } = useService(deletePerguntaGeneroTextual, {
    onSuccess: async () => {
      toastr.success('Questão removida com sucesso');
      await onSuccess();
      await onClose();
    },
  });

  const handleDelete = () => {
    request({
      id: pergunta.id,
    });
  };

  return (
    <GenericModal
      open={open}
      title="Remover questão da estratégia retórica"
      subtitle={pergunta.titulo}
      preventCloseClickOutside
      hasCloseIcon={false}
      size="sm"
      actions={[
        {
          color: 'default',
          onClick: onClose,
          label: 'CANCELAR',
        },
        {
          label: 'CONFIRMAR',
          loading: response.loading,
          onClick: () => {
            handleDelete();
          },
        },
      ]}
    >
      <>
        <TitleDeleteQuestion>Confirma a remoção da questão?</TitleDeleteQuestion>
        <Grid2 size={12} flexDirection={'column'}>
          <LabelCardQuestion>Título:</LabelCardQuestion>
          <DescriptionCardQuestion>{pergunta.titulo}</DescriptionCardQuestion>
        </Grid2>
      </>
    </GenericModal>
  );
};

export default QuestionDeleteModal;
