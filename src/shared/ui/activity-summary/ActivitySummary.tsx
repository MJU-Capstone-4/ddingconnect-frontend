import { cn } from '@/shared/utils/cn';
import {
  activitySummaryContainer,
  activitySummaryTitle,
  activitySummaryGrid,
} from './activity-summary.styles';
import { ActivitySummaryItem } from './ActivitySummaryItem';
import type { ActivitySummaryItemData } from './ActivitySummaryItem';

export type { ActivitySummaryItemData } from './ActivitySummaryItem';

export type ActivitySummaryProps = {
  title?: string;
  items: ActivitySummaryItemData[];
  className?: string;
  onTitleClick?: () => void;
};

export function ActivitySummary({
  title = '나의 활동',
  items,
  className,
  onTitleClick,
}: ActivitySummaryProps) {
  return (
    <section className={cn(activitySummaryContainer, className)} aria-label={title}>
      {onTitleClick ? (
        <button type="button" onClick={onTitleClick} className={activitySummaryTitle}>
          {title}
        </button>
      ) : (
        <h2 className={activitySummaryTitle}>{title}</h2>
      )}
      <ul className={activitySummaryGrid}>
        {items.map((item) => (
          <ActivitySummaryItem key={item.label} {...item} />
        ))}
      </ul>
    </section>
  );
}
