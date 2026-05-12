import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

export type PillButtonColor = 'blue' | 'green' | 'purple' | 'outline';

export type PillButtonProps = {
  color?: PillButtonColor;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colorStyles: Record<PillButtonColor, string> = {
  blue: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  green: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
  purple: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700',
  outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100',
};

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(function PillButton(
  { color = 'blue', disabled, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center',
        'h-[45px] w-[128px] rounded-full text-sm font-medium',
        'transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        colorStyles[color],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
