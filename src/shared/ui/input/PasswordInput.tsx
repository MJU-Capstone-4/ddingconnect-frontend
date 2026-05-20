import { forwardRef, useState } from 'react';

import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import EyeOffIcon from '@/shared/assets/icons/eye-off.svg?react';

import { Input } from './Input';
import type { InputProps } from './Input';

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'rightIcon' | 'onRightIconClick' | 'rightIconLabel'
>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [show, setShow] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        type={show ? 'text' : 'password'}
        rightIcon={show ? EyeOffIcon : EyeIcon}
        onRightIconClick={() => setShow((prev) => !prev)}
        rightIconLabel={show ? '비밀번호 숨기기' : '비밀번호 표시'}
      />
    );
  },
);
