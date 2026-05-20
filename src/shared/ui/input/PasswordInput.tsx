import { useState } from 'react';

import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import EyeOffIcon from '@/shared/assets/icons/eye-off.svg?react';

import { Input } from './Input';
import type { InputProps } from './Input';

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'rightIcon' | 'onRightIconClick' | 'rightIconLabel'
>;

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      rightIcon={show ? EyeOffIcon : EyeIcon}
      onRightIconClick={() => setShow((prev) => !prev)}
      rightIconLabel={show ? '비밀번호 숨기기' : '비밀번호 표시'}
    />
  );
}
