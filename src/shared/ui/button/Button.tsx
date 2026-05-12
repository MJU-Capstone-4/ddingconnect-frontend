import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { disabled, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-pointer items-center justify-center overflow-hidden',
        'h-button-lg rounded-button px-6 text-lg font-semibold text-text-on-primary',
        'transition-colors',
        'bg-primary hover:bg-primary-hover active:bg-primary-pressed',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...rest}
    >
      <span
        className="pointer-events-none absolute -left-5 -top-5 size-16 rounded-full bg-primary/30"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-5 -right-5 size-16 rounded-full bg-primary/20"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
});
