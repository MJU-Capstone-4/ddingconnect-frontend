import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  [
    'inline-flex cursor-pointer items-center justify-center',
    'h-8 rounded-full font-medium',
    'transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      variant: {
        filled: 'bg-surface-raised text-text-primary',
        outlined: 'bg-surface text-text-primary border border-border',
        soft: 'bg-surface-raised text-text-secondary',
      },
      size: {
        sm: 'px-3 text-xs gap-1',
        md: 'px-4 text-sm gap-1.5',
        lg: 'px-5 text-base gap-2',
      },
      active: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // filled + active
      {
        variant: 'filled',
        active: true,
        className:
          'bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-pressed',
      },
      // filled + inactive
      {
        variant: 'filled',
        active: false,
        className: 'hover:bg-gray-200 active:bg-gray-300',
      },

      // outlined + active
      {
        variant: 'outlined',
        active: true,
        className: 'border-primary text-primary bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
      },
      // outlined + inactive
      {
        variant: 'outlined',
        active: false,
        className: 'hover:bg-surface-raised active:bg-gray-100',
      },

      // soft + active
      {
        variant: 'soft',
        active: true,
        className: 'bg-blue-100 text-primary hover:bg-blue-200 active:bg-blue-300',
      },
      // soft + inactive
      {
        variant: 'soft',
        active: false,
        className: 'hover:bg-gray-200 active:bg-gray-300',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      active: false,
      fullWidth: false,
    },
  },
);
