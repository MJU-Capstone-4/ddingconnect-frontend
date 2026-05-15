export const fileUploadRoot =
  'relative flex flex-col items-center justify-center gap-2 border border-dashed rounded-lg bg-surface cursor-pointer select-none outline-none transition-colors';

export const fileUploadRootDefault = [
  'border-border',
  'hover:border-primary hover:bg-surface-raised',
  'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:border-primary',
].join(' ');

export const fileUploadRootError = [
  'border-error',
  'hover:border-error',
  'focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-1',
].join(' ');

export const fileUploadRootDisabled = 'pointer-events-none cursor-not-allowed opacity-50';

export const fileUploadVariantMap = {
  signup: 'w-[358px] h-[146px]',
  modal: 'w-[277px] h-[130px]',
} as const;

export const fileUploadIconBase = 'text-text-muted shrink-0';

export const fileUploadIconVariantMap = {
  signup: 'size-8',
  modal: 'size-6',
} as const;

export const fileUploadContent = 'flex flex-col items-center gap-0.5';

export const fileUploadTitleBase = 'font-medium text-text-secondary';

export const fileUploadTitleVariantMap = {
  signup: 'text-sm',
  modal: 'text-xs',
} as const;

export const fileUploadDescriptionBase = 'text-text-muted text-center';

export const fileUploadDescriptionVariantMap = {
  signup: 'text-xs',
  modal: 'text-2xs',
} as const;

export const fileUploadFileName = 'max-w-full px-3 text-xs font-medium text-primary truncate';

export const fileUploadErrorText = 'mt-1.5 text-xs text-error';

export const fileUploadInput = 'absolute inset-0 opacity-0 cursor-pointer';
