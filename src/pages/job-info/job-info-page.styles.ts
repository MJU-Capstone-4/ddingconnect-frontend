export const page = 'flex flex-col pb-8';

export const heroBreakout = '-mx-[18px] -mt-[24px] w-[calc(100%+36px)]';

export const searchRow = 'mt-4 flex items-center gap-2';

export const searchWrapper = 'flex-1 min-w-0';

export const filterBtn = [
  'w-10 h-10 shrink-0',
  'flex items-center justify-center',
  'rounded-full border border-border bg-surface text-text-secondary',
  'transition-colors hover:bg-surface-raised active:bg-gray-100',
].join(' ');

export const filterBtnIcon = 'w-[18px] h-[18px]';

export const section = 'mt-5';

export const sectionTitle = 'text-[15px] font-bold text-text-primary mb-3';

export const cardFullWidth = 'w-full';

export const jobList = 'flex flex-col gap-4';

export const emptyText = 'py-8 text-center text-sm text-text-muted';

// Filter bottom sheet
export const filterOverlay = 'fixed inset-0 z-[var(--z-overlay)] bg-overlay';

export const filterSheet = [
  'fixed inset-x-0 bottom-0 z-[var(--z-modal)]',
  'max-w-[430px] mx-auto',
  'bg-surface rounded-t-[20px]',
  'px-[18px] pt-5 pb-8',
  'shadow-modal',
].join(' ');

export const filterHeader = 'mb-5 flex items-center justify-between';

export const filterTitle = 'text-[15px] font-bold text-text-primary';

export const filterCloseBtn = [
  'flex h-8 w-8 items-center justify-center',
  'rounded-full text-text-secondary',
  'transition-colors hover:bg-surface-raised active:bg-gray-100',
].join(' ');

export const filterCloseBtnIcon = 'w-5 h-5';

export const filterSectionBlock = 'mb-5';

export const filterSectionLabel = 'mb-2.5 text-sm font-bold text-text-primary';

export const filterChipRow = 'flex flex-wrap gap-2';

export const filterApplyRow = 'mt-5 flex justify-end';
