export const selectWrapper = 'flex flex-col gap-1.5';

export const selectLabel = 'text-sm font-medium text-text-primary';

export const selectTrigger = [
  'relative flex items-center justify-between gap-2',
  'w-full h-[40px]',
  'bg-surface',
  'border border-border rounded-input',
  'pl-3 pr-3',
  'text-xs text-text-primary cursor-pointer',
  'outline-none transition-colors',
  'focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary',
  'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:opacity-60',
].join(' ');

export const selectTriggerPlaceholder = 'text-text-muted';

export const selectTriggerError =
  'border-error focus-visible:border-error focus-visible:ring-error';

export const selectTriggerOpen = 'border-primary ring-1 ring-primary';

export const selectChevron = [
  'shrink-0 size-4 text-text-muted transition-transform duration-200',
].join(' ');

export const selectChevronOpen = 'rotate-180';

export const selectDropdown = [
  'absolute top-[calc(100%+4px)] left-0 right-0',
  'bg-surface border border-border rounded-lg',
  'shadow-dropdown',
  'z-[var(--z-dropdown)]',
  'overflow-hidden py-1',
].join(' ');

export const selectOption = [
  'flex items-center',
  'px-3 h-9',
  'text-xs text-text-primary cursor-pointer',
  'transition-colors hover:bg-surface-raised',
].join(' ');

export const selectOptionSelected = 'text-primary font-semibold bg-primary/10';

export const selectErrorText = 'text-xs text-error';
