import { forwardRef } from 'react';

import { cn } from '@/shared/utils/cn';

import {
  buttonContentClass,
  buttonDecorationLeft,
  buttonDecorationRight,
  buttonIconClass,
  buttonVariants,
} from './button.styles';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';

export type ButtonTone = 'blue' | 'green' | 'purple' | 'yellow' | 'gray' | 'red';

export type ButtonSize =
  | 'auth'
  | 'verification'
  | 'modal'
  | 'profileCta'
  | 'dialogAction'
  | 'jobApply'
  | 'filter'
  | 'qnaSubmit'
  | 'floating'
  | 'upload'
  | 'compact'
  | 'tiny';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  withDecoration?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    tone = 'blue',
    size = 'auth',
    fullWidth = false,
    leftIcon,
    rightIcon,
    withDecoration = false,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(buttonVariants({ variant, tone, size, fullWidth }), className)}
      {...rest}
    >
      {withDecoration && (
        <>
          <span className={buttonDecorationLeft} aria-hidden="true" />
          <span className={buttonDecorationRight} aria-hidden="true" />
        </>
      )}
      {leftIcon && (
        <span className={buttonIconClass} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={buttonContentClass}>{children}</span>
      {rightIcon && (
        <span className={buttonIconClass} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});
