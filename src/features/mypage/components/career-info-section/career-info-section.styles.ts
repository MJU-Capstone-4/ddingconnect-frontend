export const section = 'rounded-card bg-surface px-5 pt-6 pb-5';

export const sectionTitle = 'text-[15px] font-semibold text-text-primary mb-5';

export const groupsWrapper = 'flex flex-col';

export const group = 'flex flex-col gap-2 py-4 first:pt-0 last:pb-0';

export const groupLabel = 'text-xs text-text-secondary';

export const chipList = 'flex flex-wrap gap-2 mt-2';

export const groupDivider = 'h-px bg-border-light w-full';

export const viewChip = 'pointer-events-none';

export const groupInput =
  'h-6 px-3 text-xs rounded-full bg-surface border border-dashed border-border text-text-secondary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[7.5rem]';

export const groupInputWrapper = 'relative';

export const groupDropdown = [
  'absolute top-[calc(100%+4px)] left-0',
  'min-w-[160px] max-h-40 overflow-y-auto',
  'bg-surface border border-border rounded-lg',
  'shadow-dropdown',
  'z-[var(--z-dropdown)]',
  'py-1',
].join(' ');

export const groupDropdownOption = [
  'flex items-center px-3 h-8',
  'text-xs text-text-primary cursor-pointer',
  'transition-colors hover:bg-surface-raised',
].join(' ');
