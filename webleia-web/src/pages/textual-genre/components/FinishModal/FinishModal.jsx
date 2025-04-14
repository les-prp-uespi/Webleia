import { Alert, Grid2 } from '@mui/material';
import { GenericModal } from 'app/shared/components';
import QuestionContent from '../QuestionContent';
import { TitleDeleteQuestion } from './style';

const FinishModal = ({ open, onClose, onSuccess, genero }) => {
  return (
    <GenericModal
      open={open}
      title="Finalizar modelo"
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
          disabled: true,
          loading: false,
          onClick: () => {},
        },
      ]}
    >
      <>
        <TitleDeleteQuestion>Confirma a finalização do modelo?</TitleDeleteQuestion>
        <TitleDeleteQuestion>Nome: {genero.nome}</TitleDeleteQuestion>
        <TitleDeleteQuestion>Quantidade de estratégias retóricas: {}</TitleDeleteQuestion>
        <TitleDeleteQuestion>Quantidade de questões dirigidas: {}</TitleDeleteQuestion>
        <Alert severity="info" style={{ marginTop: '20px' }}>
          <b>Importante</b>
          <p style={{ marginTop: '5px', marginBottom: 0 }}>
            Ao finalizar o modelo, o mesmo ficará disponível para todos os usuários, por isso
            somente confirme se tiver certeza.
          </p>
        </Alert>
      </>
    </GenericModal>
  );
};

export default FinishModal;
