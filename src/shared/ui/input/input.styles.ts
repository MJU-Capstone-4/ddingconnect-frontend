import { cva } from 'class-variance-authority';

export type InputSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'compact' | 'mini' | 'default';

export const inputBoxVariants = cva(
  [
    'flex items-center',
    'border border-border rounded-input bg-surface',
    'transition-colors',
    'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-surface-raised has-[:disabled]:opacity-60',
  ],
  {
    variants: {
      size: {
        xl: 'w-[358px] h-[58px] px-4 gap-3',
        md: 'w-[186px] h-[45px] px-3 gap-2',
        lg: 'w-[323px] h-[45px] px-4 gap-2',
        sm: 'w-[319px] h-[40px] px-3 gap-2',
        xs: 'w-[147px] h-[40px] px-3 gap-2',
        compact: 'w-[265px] h-[34px] px-3 gap-2',
        mini: 'w-[189px] h-[34px] px-2 gap-1.5',
        default: 'w-full h-10 px-3 gap-2',
      },
      hasError: {
        true: 'border-error focus-within:border-error focus-within:ring-error',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      hasError: false,
    },
  },
);

export const inputFieldBase = [
  'flex-1 min-w-0 h-full bg-transparent outline-none',
  'text-text-primary placeholder:text-text-muted',
  'disabled:cursor-not-allowed',
].join(' ');

export const inputIconSizeMap: Record<InputSize, string> = {
  xl: 'w-5 h-5',
  lg: 'w-4 h-4',
  md: 'w-4 h-4',
  sm: 'w-4 h-4',
  xs: 'w-4 h-4',
  compact: 'w-3.5 h-3.5',
  mini: 'w-3.5 h-3.5',
  default: 'w-4 h-4',
};

export const inputTextSizeMap: Record<InputSize, string> = {
  xl: 'text-sm',
  lg: 'text-xs',
  md: 'text-xs',
  sm: 'text-xs',
  xs: 'text-xs',
  compact: 'text-xs',
  mini: 'text-xs',
  default: 'text-xs',
};

export const inputLabel = 'text-sm font-medium text-text-primary';
export const inputHelperText = 'text-xs text-text-muted';
export const inputError = 'text-xs text-error';
export const inputIconBase = 'shrink-0 text-text-muted';
export const inputIconButton = [
  'shrink-0 flex items-center justify-center text-text-muted',
  'rounded-sm transition-colors',
  'hover:text-text-secondary',
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
].join(' ');
