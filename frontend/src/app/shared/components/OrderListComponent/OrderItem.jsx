import { Box, IconButton, Typography } from '@mui/material';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { OrderItemContainer } from './styles';
import { MdDragIndicator, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Theme } from 'app/shared/utils';

const OrderItem = memo(function OrderItem({ id, title, subtitle, moveItem, findItem, lastIndex }) {
  const originalIndex = findItem(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ITEM',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveItem(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveItem],
  );
  const [, drop] = useDrop(
    () => ({
      accept: 'ITEM',
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findItem(id);
          moveItem(draggedId, overIndex);
        }
      },
    }),
    [findItem, moveItem],
  );

  const moveUp = () => {
    moveItem(id, originalIndex - 1);
  };

  const moveDown = () => {
    moveItem(id, originalIndex + 1);
  };

  const opacity = isDragging ? 0.5 : 1;
  return (
    <OrderItemContainer
      display="flex"
      padding="10px 20px"
      justifyContent="space-between"
      sx={{
        cursor: 'move',
        opacity,
      }}
      ref={(node) => drag(drop(node))}
    >
      <Box display="flex" alignItems="center">
        <Box display="flex" flexDirection="column">
          <Typography fontSize="12px" color={Theme.colors.black} fontWeight="bold">
            {title}
          </Typography>
          <Typography fontSize="14px" color={Theme.colors.black}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <IconButton onClick={moveUp} size="small" disabled={originalIndex === 0}>
          <MdExpandLess />
        </IconButton>
        <IconButton onClick={moveDown} size="small" disabled={originalIndex === lastIndex}>
          <MdExpandMore />
        </IconButton>
      </Box>
    </OrderItemContainer>
  );
});

export default OrderItem;
