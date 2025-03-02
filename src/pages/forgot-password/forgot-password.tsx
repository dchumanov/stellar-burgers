import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { Preloader } from '@ui';
import {
  forgotPasswordThunk,
  isErrorSelector,
  isLoadingSelector,
  resetErrorMessage
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { useForm } from '../../hooks/use-form';

export const ForgotPassword: FC = () => {
  const [formData, handleChange] = useForm({
    email: ''
  });

  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk({ email: formData.email })).then((data) => {
      if (data.payload) {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      }
    });
  };

  if (isLoading) return <Preloader />;

  return (
    <ForgotPasswordUI
      errorText={isError ? 'Электронный адрес не существует или не найден' : ''}
      email={formData.email}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
