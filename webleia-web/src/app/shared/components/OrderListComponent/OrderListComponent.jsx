import { Box } from '@mui/material';
import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import OrderItem from './OrderItem';
import { useIsFirstRender } from 'app/shared/hooks';

const OrderListComponent = ({ items, onChange }) => {
  const [orderItems, setOrderItems] = useState(items);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) {
      onChange?.(orderItems);
    }
  }, [orderItems]);

  const findItem = useCallback(
    (id) => {
      const item = orderItems.filter((c) => `${c.id}` === id)[0];
      return {
        item,
        index: orderItems.indexOf(item),
      };
    },
    [orderItems],
  );

  const moveItem = useCallback(
    (id, atIndex) => {
      const { item, index } = findItem(id);
      setOrderItems(
        update(orderItems, {
          $splice: [
            [index, 1],
            [atIndex, 0, item],
          ],
        }),
      );
    },
    [findItem, orderItems, setOrderItems],
  );
  const [, drop] = useDrop(() => ({ accept: 'ITEM' }));

  return (
    <Box ref={drop}>
      {orderItems
        .sort((item) => item.ordem)
        .map((item) => (
          <OrderItem
            key={item.id}
            id={`${item.id}`}
            title={item.title}
            subtitle={item.subtitle}
            moveItem={moveItem}
            findItem={findItem}
            lastIndex={orderItems.length - 1}
          />
        ))}
    </Box>
  );
};

export default OrderListComponent;
