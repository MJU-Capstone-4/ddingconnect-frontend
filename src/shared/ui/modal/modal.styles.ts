import { cva } from 'class-variance-authority';

export type ModalTone = 'blue' | 'yellow' | 'green' | 'purple';
export type ModalContentSize = 'sm' | 'md' | 'lg';
export type ModalHeaderLayout = 'stacked' | 'row';
export type ModalFooterLayout = 'col' | 'row';

export const modalContentVariants = cva(
  'relative flex flex-col bg-surface rounded-modal shadow-modal overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-[302px] h-[300px]',
        md: 'w-[326px] h-[325px]',
        lg: 'w-[326px] h-[364px]',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export const modalHeaderVariants = cva('relative overflow-hidden shrink-0', {
  variants: {
    tone: {
      blue: 'bg-gradient-primary',
      yellow: 'bg-gradient-point',
      green: 'bg-gradient-job-info',
      purple: 'bg-gradient-roadmap',
    },
    layout: {
      stacked: 'flex flex-col gap-2 px-5 pt-4 pb-5',
      row: 'flex flex-row items-center gap-3 px-4 pt-4 pb-4',
    },
  },
  defaultVariants: {
    tone: 'blue',
    layout: 'stacked',
  },
});

export const modalFooterVariants = cva('relative flex px-5 pb-5 pt-2 shrink-0', {
  variants: {
    layout: {
      col: 'flex-col items-center gap-2',
      row: 'flex-row justify-center gap-3',
    },
  },
  defaultVariants: {
    layout: 'col',
  },
});

export const modalOverlayClass = 'fixed inset-0 z-[var(--z-overlay)] bg-overlay';
export const modalWrapperClass =
  'fixed inset-0 z-[var(--z-modal)] flex items-center justify-center';

// Header decoration circles — white-transparent on colored background
export const modalHeaderDecorationBase = 'pointer-events-none absolute rounded-full';
export const modalHeaderDecoration1 = 'size-24 -right-6 -top-6 bg-white/15';
export const modalHeaderDecoration2 = 'size-32 -bottom-10 -left-8 bg-white/10';

// Content background decoration circles — colored on white background (e.g. point modal)
export const modalContentDecoration1 = 'size-36 -top-10 -left-10';
export const modalContentDecoration2 = 'size-36 -bottom-10 -right-10';

export const modalContentDecorationToneMap: Record<ModalTone, string> = {
  blue: 'bg-blue-50',
  yellow: 'bg-yellow-100',
  green: 'bg-green-50',
  purple: 'bg-purple-50',
};

export const modalTitleClass =
  'relative z-10 text-base font-bold text-text-on-primary leading-snug pr-8';
export const modalDescriptionClass = 'relative z-10 text-sm text-text-on-primary/80 mt-0.5';

// relative ensures Body/Footer paint above the content decoration layer (z-0)
export const modalBodyClass = 'relative flex-1 overflow-y-auto px-5 py-4';

export const modalCloseClass = [
  'absolute top-3 right-3 z-10',
  'flex items-center justify-center size-8 rounded-full',
  'bg-white text-gray-700 transition-colors',
  'hover:bg-gray-100 active:bg-gray-200',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
].join(' ');

export const modalIconClass = [
  'relative z-10 flex items-center justify-center',
  'size-11 rounded-full bg-white shrink-0',
].join(' ');
