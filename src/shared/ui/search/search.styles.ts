export const searchInputWrapper = [
  'relative inline-flex items-center',
  'h-[42px] rounded-full',
  'border border-border bg-surface',
  'transition-colors',
  'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
].join(' ');

export const searchInput = [
  'h-full w-full bg-transparent',
  'text-2xs text-text-primary',
  'placeholder:text-text-muted',
  'outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ');

export const searchIconBase = 'pointer-events-none size-[25px] shrink-0 text-text-muted';

export const searchWidthMap = {
  compact: 'w-[284px]',
  regular: 'w-[330px]',
  full: 'w-full',
} as const;

export const iconPaddingMap = {
  left: {
    input: 'pl-2.5 pr-3',
    icon: 'absolute left-2.5',
    inputIndent: 'pl-10',
  },
  right: {
    input: 'pl-3 pr-2.5',
    icon: 'absolute right-2.5',
    inputIndent: 'pr-10',
  },
} as const;
