import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  isErrorSelector,
  isLoadingSelector,
  loginUserThunk,
  resetErrorMessage
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { useForm } from '../../hooks/use-form';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [formData, handleChange] = useForm({
    email: '',
    password: ''
  });

  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUserThunk({ email: formData.email, password: formData.password })
    );
  };

  if (isLoading) return <Preloader />;
  return (
    <LoginUI
      errorText={isError ? 'Электронный адрес или пароль введены неверно' : ''}
      email={formData.email}
      password={formData.password}
      handleSubmit={onSubmit}
      handleChange={handleChange}
    />
  );
};
