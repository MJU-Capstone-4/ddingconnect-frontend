import { cva } from 'class-variance-authority';

export const chipIconSize = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
} satisfies Record<string, string>;

export const chipVariants = cva(
  [
    'inline-flex cursor-pointer items-center justify-center w-fit shrink-0 whitespace-nowrap',
    'rounded-full font-medium',
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
        sm: 'h-6 px-3 text-xs gap-1',
        md: 'h-[30px] px-4 text-xs gap-1.5',
        lg: 'h-10 px-5 text-xs gap-2',
      },
      tone: {
        default: '',
        gray: '',
        blue: '',
        purple: '',
        pink: '',
        green: '',
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
      {
        variant: 'filled',
        active: true,
        className:
          'bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-pressed',
      },
      {
        variant: 'filled',
        active: false,
        className: 'hover:bg-gray-200 active:bg-gray-300',
      },
      {
        variant: 'outlined',
        active: true,
        className: 'border-primary text-primary bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
      },
      {
        variant: 'outlined',
        active: false,
        className: 'hover:bg-surface-raised active:bg-gray-100',
      },
      {
        variant: 'soft',
        active: true,
        className: 'bg-blue-100 text-primary hover:bg-blue-200 active:bg-blue-300',
      },
      {
        variant: 'soft',
        active: false,
        className: 'hover:bg-gray-200 active:bg-gray-300',
      },

      { tone: 'gray', className: 'bg-gray-200 text-gray-700 hover:bg-gray-300' },
      { tone: 'blue', className: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
      { tone: 'blue', size: 'md', className: 'font-semibold' },
      { tone: 'purple', className: 'bg-purple-100 text-purple-600 hover:bg-purple-50' },
      { tone: 'pink', className: 'bg-pink-100 text-pink-500 hover:bg-pink-50' },
      { tone: 'green', className: 'bg-green-100 text-green-600 hover:bg-green-50' },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      tone: 'default',
      active: false,
      fullWidth: false,
    },
  },
);
