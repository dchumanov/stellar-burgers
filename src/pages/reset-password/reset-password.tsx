import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import {
  isErrorSelector,
  isLoadingSelector,
  resetErrorMessage,
  resetPasswordThunk
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { useForm } from '../../hooks/use-form';
import { Preloader } from '@ui';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, handleChange] = useForm({
    password: '',
    token: ''
  });

  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(
      resetPasswordThunk({ password: formData.password, token: formData.token })
    )
      .then((data) => {
        if (data.payload) {
          localStorage.removeItem('resetPassword');
          navigate('/login');
        }
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    dispatch(resetErrorMessage());
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate, dispatch]);

  if (isLoading) return <Preloader />;

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={formData.password}
      token={formData.token}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
