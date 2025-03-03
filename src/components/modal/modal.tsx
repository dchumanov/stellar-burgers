import { FC, memo, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!modalRoot) {
    console.error('Не найден элемент #modals. Проверь index.html!');
    return null;
  }

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={handleClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
