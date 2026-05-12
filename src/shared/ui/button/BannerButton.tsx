import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

export type BannerButtonColor = 'blue' | 'green' | 'purple';

export type BannerButtonProps = {
  color?: BannerButtonColor;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colorStyles: Record<BannerButtonColor, { bg: string; circle: string }> = {
  blue: {
    bg: 'bg-primary hover:bg-primary-hover active:bg-primary-pressed',
    circle: 'bg-blue-400/30',
  },
  green: {
    bg: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
    circle: 'bg-green-400/30',
  },
  purple: {
    bg: 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700',
    circle: 'bg-purple-400/30',
  },
};

export const BannerButton = forwardRef<HTMLButtonElement, BannerButtonProps>(function BannerButton(
  { color = 'blue', disabled, className, children, type = 'button', ...rest },
  ref,
) {
  const styles = colorStyles[color];

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'relative flex w-[253px] cursor-pointer items-center justify-center overflow-hidden',
        'h-button-sm rounded-button px-6 text-sm font-semibold text-text-on-primary',
        'transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        styles.bg,
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          'pointer-events-none absolute -right-4 top-1/2 size-14 -translate-y-1/2 rounded-full',
          styles.circle,
        )}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
});
