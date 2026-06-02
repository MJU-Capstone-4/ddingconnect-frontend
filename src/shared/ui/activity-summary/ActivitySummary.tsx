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
  onItemClick?: (label: string) => void;
};

export function ActivitySummary({
  title = '나의 활동',
  items,
  className,
  onTitleClick,
  onItemClick,
}: ActivitySummaryProps) {
  return (
    <section className={cn(activitySummaryContainer, className)} aria-label={title}>
      <h2 className={activitySummaryTitle}>
        {onTitleClick ? (
          <button type="button" onClick={onTitleClick}>
            {title}
          </button>
        ) : (
          title
        )}
      </h2>
      <ul className={activitySummaryGrid}>
        {items.map((item) => (
          <ActivitySummaryItem
            key={item.label}
            {...item}
            onClick={onItemClick ? () => onItemClick(item.label) : undefined}
          />
        ))}
      </ul>
    </section>
  );
}
