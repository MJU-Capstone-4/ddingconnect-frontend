import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

export type PillButtonColor = 'blue' | 'green' | 'purple' | 'outline';

export type PillButtonProps = {
  color?: PillButtonColor;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colorStyles: Record<PillButtonColor, string> = {
  blue: 'bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-pressed',
  green: 'bg-job-info text-text-on-primary hover:bg-job-info-hover active:bg-job-info-pressed',
  purple: 'bg-roadmap text-text-on-primary hover:bg-roadmap-hover active:bg-roadmap-pressed',
  outline:
    'bg-surface text-gray-700 border border-border hover:bg-surface-raised active:bg-gray-100',
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
        'h-button-md w-[128px] rounded-full text-sm font-medium',
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
