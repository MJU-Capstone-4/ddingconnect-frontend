import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/cn';
import { chipVariants } from './chip.styles';

export type ChipProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & VariantProps<typeof chipVariants> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    children: ReactNode;
  };

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    variant,
    size,
    active,
    fullWidth,
    leftIcon,
    rightIcon,
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
      aria-pressed={active ?? undefined}
      className={cn(chipVariants({ variant, size, active, fullWidth }), className)}
      {...rest}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
});

Chip.displayName = 'Chip';
