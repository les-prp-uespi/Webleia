import { Card, Grid2 } from '@mui/material';
import { TableActionButton } from 'app/shared/components';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import QuestionContent from '../QuestionContent';
import { TitleCardQuestion } from './style';
import { useState } from 'react';
import QuestionDeleteModal from '../QuestionDeleteModal';
import EditEstrategiaModal from '../EditEstrategiaModal';

const QuestionCard = ({ titulo, isRequired, isFinalText, pergunta, onSuccess }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditPerguntaModal, setOpenEditPerguntaModal] = useState(false);

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      <Card
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '8px',
          border: 'none',
          marginBottom: '15px',
        }}
      >
        <Grid2 container justifyContent={'space-between'} flexDirection={'row'}>
          <Grid2>
            <TitleCardQuestion>
              #{pergunta.id} {titulo}
            </TitleCardQuestion>
          </Grid2>
          <Grid2 container spacing={1}>
            <TableActionButton
              onClick={() => {
                setOpenEditPerguntaModal(true);
              }}
            >
              <FiEdit2 />
            </TableActionButton>
            <TableActionButton
              onClick={() => {
                handleDelete();
              }}
            >
              <FiTrash />
            </TableActionButton>
          </Grid2>
        </Grid2>
        <QuestionContent titulo={titulo} isRequired={isRequired} isFinalText={isFinalText} />
      </Card>
      {openDeleteModal && pergunta && (
        <QuestionDeleteModal
          pergunta={pergunta}
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onSuccess={() => onSuccess(true)}
        />
      )}
      {openEditPerguntaModal && pergunta && (
        <EditEstrategiaModal
          open={openEditPerguntaModal}
          onClose={() => setOpenEditPerguntaModal(false)}
          pergunta={pergunta}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default QuestionCard;
