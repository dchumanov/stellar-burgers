import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  isErrorSelector,
  isLoadingSelector,
  registerUserThunk,
  resetErrorMessage
} from '@slices';
import { Preloader } from '@ui';
import { useForm } from '../../hooks/use-form';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [formData, handleChange] = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    );
  };

  if (isLoading) return <Preloader />;

  return (
    <RegisterUI
      errorText={isError ? 'Пользователь с таким адресом уже существует' : ''}
      email={formData.email}
      userName={formData.name}
      password={formData.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
