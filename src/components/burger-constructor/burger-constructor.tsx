import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItemsSelector,
  getOrderRequestSelector,
  getOrderResponseSelector,
  getUserDataSelector,
  resetConstructorItems,
  resetOrderResponse,
  orderBurgerThunk
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(getUserDataSelector);
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderResponseSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(orderBurgerThunk(constructorItems));
    dispatch(resetConstructorItems());
    setIsOpen(false);
  };

  const closeOrderModal = () => {
    dispatch(resetOrderResponse());
    setIsOpen(false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
