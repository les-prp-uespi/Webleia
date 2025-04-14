import { Grid2 } from '@mui/material';
import { GenericModal } from 'app/shared/components';
import QuestionContent from '../QuestionContent';
import { DescriptionCardQuestion, LabelCardQuestion, TitleDeleteQuestion } from './style';
import { useService } from 'app/shared/hooks';
import { deleteGeneroTextual } from 'app/services/pergunta';
import toastr from 'toastr';

const GeneroDeleteModal = ({ open, onClose, genero, onSuccess }) => {
  const { request, response } = useService(deleteGeneroTextual, {
    onSuccess: async () => {
      toastr.success('Modelo de gênero textual removido com sucesso');
      await onSuccess();
      await onClose();
    },
  });

  const handleDelete = () => {
    request({
      id: genero.id,
    });
  };

  return (
    <GenericModal
      open={open}
      title="Remover modelo de gênero textual"
      subtitle={genero.nome}
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
        <TitleDeleteQuestion>Confirma a remoção do modelo?</TitleDeleteQuestion>
        <Grid2 size={12} flexDirection={'column'}>
          <LabelCardQuestion>Nome:</LabelCardQuestion>
          <DescriptionCardQuestion>{genero.nome}</DescriptionCardQuestion>
        </Grid2>
      </>
    </GenericModal>
  );
};

export default GeneroDeleteModal;
