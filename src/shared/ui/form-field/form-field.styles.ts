export const fieldWrapper = 'flex flex-col gap-1.5';

export const fieldLabel = 'text-sm font-medium text-text-primary';

export const fieldLabelAsterisk = 'ml-0.5 text-error';

export const fieldInputBase = [
  'w-full bg-surface',
  'border border-border rounded-input',
  'px-4',
  'text-xs text-text-primary',
  'placeholder:text-text-muted',
  'outline-none transition-colors',
  'focus:border-primary focus:ring-1 focus:ring-primary',
  'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:opacity-60',
].join(' ');

export const fieldInputError = 'border-error focus:border-error focus:ring-error';

export const fieldInputSingle = 'h-10';

export const fieldInputMulti = 'h-[98px] resize-none py-3';

export const fieldErrorText = 'text-xs text-error';
