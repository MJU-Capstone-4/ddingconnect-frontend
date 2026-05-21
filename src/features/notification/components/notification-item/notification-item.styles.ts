export const card =
  'relative w-full bg-surface border border-border-light rounded-card shadow-card p-4 flex items-start gap-3';

export const cardClickable =
  'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export const iconWrapBase = 'shrink-0 w-10 h-10 rounded-full flex items-center justify-center';

export const iconWrapVariants: Record<string, string> = {
  coffeechat: `${iconWrapBase} bg-coffee-chat-soft text-coffee-chat`,
  job: `${iconWrapBase} bg-job-info-soft text-job-info`,
  qna: `${iconWrapBase} bg-qna-soft text-qna`,
  roadmap: `${iconWrapBase} bg-roadmap-soft text-roadmap`,
};

export const iconSize = 'w-5 h-5';

export const content = 'flex-1 min-w-0 flex flex-col gap-1';

export const titleStyle = 'text-base font-semibold text-text-primary leading-snug';

export const descriptionStyle = 'text-sm text-text-secondary leading-snug';

export const timeStyleRead = 'mt-1 text-xs text-text-muted';

export const timeStyleUnread = 'mt-1 text-xs text-primary font-medium';

export const unreadDot = 'absolute top-3 right-3 w-2 h-2 rounded-full bg-error';
