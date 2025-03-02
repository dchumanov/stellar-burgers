import { ChangeEvent, useState } from 'react';

export const useForm = (initialState: { [key: string]: string }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData({ ...formData, [inputName]: inputValue });
  };

  return [formData, handleChange] as const;
};
