import { Grid2 } from '@mui/material';
import { editCategoriaPergunta } from 'app/services/categoriaPergunta';
import { updatePergunta } from 'app/services/pergunta';
import { GenericModal, OrderListComponent } from 'app/shared/components';
import { useService } from 'app/shared/hooks';
import { useState } from 'react';
import toastr from 'toastr';

const OrderMovimentosModal = ({ open, onClose, movimentos, onSuccess }) => {
  const [orderedMovimentos, setOrderedMovimentos] = useState();
  const { request: requestUpdateCategoriaPergunta, response } = useService(editCategoriaPergunta);

  const handleOnChange = (orderItems) => {
    const orderItemsModified = orderItems.map((orderItem, key) => {
      return {
        ordem: key + 1,
        id: orderItem.id,
      };
    });

    const itensModificados = orderItemsModified.filter((modifiedItem) => {
      const originalItem = movimentos.find((item) => item.id === modifiedItem.id);
      return originalItem && Number(originalItem.ordem) !== Number(modifiedItem.ordem);
    });

    setOrderedMovimentos(itensModificados);
  };

  const onSubmit = () => {
    const promises = orderedMovimentos.map((item) =>
      requestUpdateCategoriaPergunta({ id: item.id, ordem: item.ordem }),
    );

    Promise.all(promises)
      .then((results) => {
        toastr.success('Movimentos reordenados com sucesso');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toastr.error('Erro ao reordenar movimentos');
      });
  };

  return (
    <GenericModal
      open={open}
      title="Ordenar movimentos"
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
            onSubmit();
          },
        },
      ]} 
    >
      <>
        <OrderListComponent items={movimentos} onChange={handleOnChange} />
      </>
    </GenericModal>
  );
};

export default OrderMovimentosModal;
