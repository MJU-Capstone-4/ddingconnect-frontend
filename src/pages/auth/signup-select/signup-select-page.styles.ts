export const page = 'flex flex-col h-full bg-background';

export const header = 'flex items-center gap-2 h-14 px-4';
export const backButton = [
  'flex items-center justify-center w-9 h-9 rounded-full',
  'text-text-primary',
  'hover:bg-gray-100 active:bg-gray-200',
  'transition-colors duration-100',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
].join(' ');
export const backIcon = 'w-5 h-5';
export const title = 'text-[20px] font-semibold text-text-primary';

export const description = 'text-[15px] text-text-secondary px-5 mt-5 mb-5';

export const cardList = 'flex flex-col gap-4 px-5';

export const card = [
  'flex items-center gap-4 px-5 py-5 bg-surface',
  'border border-border rounded-[20px]',
  'cursor-pointer select-none outline-none',
  'hover:shadow-sm active:scale-[0.98]',
  'transition-all duration-100',
  'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
].join(' ');

export const iconWrapperStudent =
  'flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-green-300 shrink-0';
export const iconWrapperGraduate =
  'flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-purple-400 shrink-0';
export const cardIcon = 'w-6 h-6 text-white';

export const cardText = 'flex flex-col gap-1';
export const cardTitle = 'text-[15px] font-semibold text-text-primary';
export const cardSubtitle = 'text-[12px] text-text-secondary';

export const loginCta = 'mt-8 text-center text-[15px] text-text-secondary';
export const loginLink = 'text-primary font-semibold';
