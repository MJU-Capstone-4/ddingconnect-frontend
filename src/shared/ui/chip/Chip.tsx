import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/cn';
import { chipIconSize, chipVariants } from './chip.styles';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type ChipProps = {
  leftIcon?: SvgIcon;
  rightIcon?: SvgIcon;
} & VariantProps<typeof chipVariants> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    children: ReactNode;
  };

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    variant,
    size,
    tone,
    active,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const resolvedSize = size ?? 'md';
  const iconClass = cn('shrink-0', chipIconSize[resolvedSize]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={active ?? undefined}
      className={cn(chipVariants({ variant, size, tone, active }), className)}
      {...rest}
    >
      {LeftIcon && <LeftIcon className={iconClass} />}
      {children}
      {RightIcon && <RightIcon className={iconClass} />}
    </button>
  );
});

Chip.displayName = 'Chip';
