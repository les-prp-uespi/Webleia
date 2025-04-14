import { Grid2 } from '@mui/material';
import { updatePergunta, updatePerguntaGeneroTextual } from 'app/services/pergunta';
import { GenericModal, OrderListComponent } from 'app/shared/components';
import { useService } from 'app/shared/hooks';
import { useState } from 'react';
import toastr from 'toastr';

const OrderEstrategiasModal = ({ open, onClose, estrategias, movimentoTitulo, onSuccess }) => {
  const [orderedEstrategias, setOrderedEstrategias] = useState();
  const { request: requestUpdatePerguntaGeneroTextual, response } = useService(
    updatePerguntaGeneroTextual,
  );

  const handleOnChange = (orderItems) => {
    const orderItemsModified = orderItems.map((orderItem, key) => {
      return {
        ordem: key + 1,
        id: orderItem.id,
      };
    });

    const itensModificados = orderItemsModified.filter((modifiedItem) => {
      const originalItem = estrategias.find((item) => item.id === modifiedItem.id);
      return originalItem && Number(originalItem.ordem) !== Number(modifiedItem.ordem);
    });

    setOrderedEstrategias(itensModificados);
  };

  const onSubmit = () => {
    const promises = orderedEstrategias.map((item) =>
      requestUpdatePerguntaGeneroTextual({ id: item.id, ordem: item.ordem }),
    );

    Promise.all(promises)
      .then((results) => {
        toastr.success('Estratégias reordenadas com sucesso');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toastr.error('Erro ao reordenar estratégias');
      });
  };

  return (
    <GenericModal
      open={open}
      title="Ordenar estratégias"
      subtitle={movimentoTitulo}
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
        <OrderListComponent items={estrategias} onChange={handleOnChange} />
      </>
    </GenericModal>
  );
};

export default OrderEstrategiasModal;
