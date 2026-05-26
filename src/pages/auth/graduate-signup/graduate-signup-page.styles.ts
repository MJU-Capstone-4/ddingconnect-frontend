export const page = 'flex flex-col h-full bg-background';

export const header = 'flex items-center gap-2 h-14 px-4 shrink-0';
export const backButton = [
  'flex items-center justify-center w-9 h-9 rounded-full',
  'text-text-primary',
  'hover:bg-gray-100 active:bg-gray-200',
  'transition-colors duration-100',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
].join(' ');
export const backIcon = 'w-5 h-5';
export const title = 'text-xl font-semibold text-text-primary';

export const scrollArea = 'flex-1 min-h-0 overflow-y-auto';
export const content = 'flex flex-col px-[18px]';

export const banner = [
  'relative flex items-center gap-3 px-5 h-12 rounded-2xl overflow-hidden',
  'mt-5 bg-purple-400',
].join(' ');
export const bannerDecorationLeft =
  'pointer-events-none absolute -left-5 -top-5 z-0 size-16 rounded-full bg-white/25';
export const bannerDecorationRight =
  'pointer-events-none absolute -bottom-5 -right-5 z-0 size-16 rounded-full bg-white/20';
export const bannerIcon = 'w-5 h-5 text-white shrink-0 relative z-10';
export const bannerText = 'text-sm font-semibold text-white relative z-10';

export const section = 'py-5';
export const divider = 'h-px bg-border-light';
export const submitArea = 'pt-4 pb-8';
