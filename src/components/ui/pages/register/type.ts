import { ChangeEvent, SyntheticEvent } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  handleSubmit: (e: SyntheticEvent) => void;
};
