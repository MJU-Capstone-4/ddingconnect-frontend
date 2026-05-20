import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'relative inline-flex cursor-pointer items-center justify-center gap-2',
    'font-semibold transition-colors overflow-hidden whitespace-nowrap',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent',
        ghost: 'bg-transparent',
      },
      tone: {
        blue: '',
        green: '',
        purple: '',
        yellow: '',
        gray: '',
        red: '',
      },
      size: {
        auth: 'h-14 w-[358px] rounded-button text-base px-6',
        verification: 'h-[45px] w-[128px] rounded-button text-xs px-3',
        modal: 'h-10 w-[234px] rounded-button text-xs px-4',
        profileCta: 'h-[52px] w-[306px] rounded-button text-[15px] px-5',
        dialogAction: 'h-10 w-[119px] rounded-button text-xs px-3',
        jobApply: 'h-10 w-[291px] rounded-button text-[15px] px-5',
        filter: 'h-8 w-[115px] rounded-full text-xs px-4',
        qnaSubmit: 'h-[58px] w-[155px] rounded-button text-[15px] px-4',
        floating: 'h-12 w-[99px] rounded-button text-xs px-3',
        upload: 'h-10 w-[277px] rounded-button text-xs px-4',
        compact: 'h-[21px] w-[69px] rounded-button text-2xs px-2',
        tiny: 'h-[19px] w-[38px] rounded-full text-[11px] px-1.5',
        delete: 'h-10 w-14 rounded-button text-xs px-3',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        tone: 'blue',
        className:
          'bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-pressed',
      },
      {
        variant: 'solid',
        tone: 'green',
        className: 'bg-green-300 text-gray-700 hover:bg-green-400 active:bg-green-500',
      },
      {
        variant: 'solid',
        tone: 'purple',
        className:
          'bg-roadmap text-text-on-primary hover:bg-roadmap-hover active:bg-roadmap-pressed',
      },
      {
        variant: 'solid',
        tone: 'yellow',
        className: 'bg-point text-gray-800 hover:bg-yellow-300 active:bg-yellow-500',
      },
      {
        variant: 'solid',
        tone: 'gray',
        className: 'bg-surface-raised text-text-secondary hover:bg-gray-200 active:bg-gray-300',
      },
      {
        variant: 'solid',
        tone: 'red',
        className: 'bg-red-300 text-text-on-primary hover:bg-red-500 active:bg-red-600',
      },
      {
        variant: 'outline',
        tone: 'blue',
        className: 'border-primary text-primary hover:bg-blue-50 active:bg-blue-100',
      },
      {
        variant: 'outline',
        tone: 'green',
        className: 'border-green-300 text-green-500 hover:bg-green-50 active:bg-green-100',
      },
      {
        variant: 'outline',
        tone: 'purple',
        className: 'border-roadmap text-roadmap hover:bg-purple-50 active:bg-purple-100',
      },
      {
        variant: 'outline',
        tone: 'yellow',
        className: 'border-point text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100',
      },
      {
        variant: 'outline',
        tone: 'gray',
        className: 'border-border text-text-secondary hover:bg-surface-raised active:bg-gray-100',
      },
      {
        variant: 'outline',
        tone: 'red',
        className: 'border-red-300 text-red-500 hover:bg-red-50 active:bg-red-100',
      },
      {
        variant: 'ghost',
        tone: 'blue',
        className: 'text-primary hover:bg-blue-50 active:bg-blue-100',
      },
      {
        variant: 'ghost',
        tone: 'green',
        className: 'text-green-500 hover:bg-green-50 active:bg-green-100',
      },
      {
        variant: 'ghost',
        tone: 'purple',
        className: 'text-roadmap hover:bg-purple-50 active:bg-purple-100',
      },
      {
        variant: 'ghost',
        tone: 'yellow',
        className: 'text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100',
      },
      {
        variant: 'ghost',
        tone: 'gray',
        className: 'text-text-secondary hover:bg-surface-raised active:bg-gray-100',
      },
      {
        variant: 'ghost',
        tone: 'red',
        className: 'text-error hover:bg-red-50 active:bg-red-100',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      tone: 'blue',
      size: 'auth',
      fullWidth: false,
    },
  },
);

export const buttonDecorationLeft =
  'pointer-events-none absolute -left-5 -top-5 z-0 size-16 rounded-full bg-white/25';
export const buttonDecorationRight =
  'pointer-events-none absolute -bottom-5 -right-5 z-0 size-16 rounded-full bg-white/20';

export const buttonIconClass = 'relative z-10 flex shrink-0 items-center';
export const buttonContentClass = 'relative z-10';
