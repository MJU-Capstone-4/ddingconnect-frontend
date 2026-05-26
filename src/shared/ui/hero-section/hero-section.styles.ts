import { cva } from 'class-variance-authority';

export type HeroSectionVariant =
  | 'primary'
  | 'coffeeChat'
  | 'roadmap'
  | 'qna'
  | 'jobInfo'
  | 'point'
  | 'activity';

export const heroSectionVariants = cva('relative w-full overflow-hidden', {
  variants: {
    variant: {
      primary: 'bg-gradient-primary',
      coffeeChat: 'bg-gradient-coffee-chat',
      roadmap: 'bg-gradient-roadmap',
      qna: 'bg-gradient-qna',
      jobInfo: 'bg-gradient-job-info',
      point: 'bg-point',
      activity: 'bg-gradient-job-info',
    },
    collapsed: {
      true: 'px-page-x py-3',
      false: 'px-page-x pt-5 pb-8',
    },
  },
  defaultVariants: {
    variant: 'primary',
    collapsed: false,
  },
});
