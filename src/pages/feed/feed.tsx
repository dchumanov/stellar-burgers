import { fetchAllFeedsThunk, getAllOrdersSelector } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const orders = useSelector(getAllOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFeedsThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchAllFeedsThunk());
      }}
    />
  );
};
