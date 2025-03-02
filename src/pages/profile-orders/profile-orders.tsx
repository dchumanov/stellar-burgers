import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getUserOrdersThunk, getUserOrdersSelector } from '@slices';
import { AppDispatch } from '@store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrdersSelector);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
