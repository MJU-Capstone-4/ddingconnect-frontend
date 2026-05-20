import { cva } from 'class-variance-authority';

export const activitySummaryContainer =
  'w-[302px] h-[135px] bg-surface border border-border-light rounded-card shadow-card flex flex-col items-center pt-4';

export const activitySummaryTitle = 'text-2xs text-text-secondary';

export const activitySummaryGrid = 'flex items-center justify-around w-full flex-1';

export const activitySummaryItem = 'flex flex-col items-center gap-1';

export const activitySummaryIconVariants = cva(
  'flex items-center justify-center rounded-full w-11 h-11 shrink-0',
  {
    variants: {
      tone: {
        blue: 'bg-coffee-chat text-white',
        purple: 'bg-roadmap text-white',
        pink: 'bg-qna-soft text-qna',
      },
    },
    defaultVariants: {
      tone: 'blue',
    },
  },
);

export const activitySummaryIconSize = 'w-6 h-6';

export const activitySummaryCount = 'text-[15px] font-bold leading-tight text-text-primary';

export const activitySummaryLabel = 'text-2xs leading-none text-text-secondary';
