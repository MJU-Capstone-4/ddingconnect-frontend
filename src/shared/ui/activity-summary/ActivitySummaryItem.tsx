import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/shared/utils/cn';
import {
  activitySummaryItem,
  activitySummaryIconVariants,
  activitySummaryIconSize,
  activitySummaryCount,
  activitySummaryLabel,
} from './activity-summary.styles';

export type ActivitySummaryTone = 'blue' | 'purple' | 'pink';
export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type ActivitySummaryItemData = {
  icon: SvgIcon;
  count: number;
  label: string;
  tone: ActivitySummaryTone;
  onClick?: () => void;
};

export function ActivitySummaryItem({
  icon: Icon,
  count,
  label,
  tone,
  onClick,
}: ActivitySummaryItemData) {
  const content = (
    <>
      <div className={cn(activitySummaryIconVariants({ tone }))} aria-hidden="true">
        <Icon className={activitySummaryIconSize} />
      </div>
      <p className={activitySummaryCount} aria-hidden="true">
        {count}
      </p>
      <span className={activitySummaryLabel} aria-hidden="true">
        {label}
      </span>
    </>
  );

  if (onClick) {
    return (
      <li>
        <button
          type="button"
          onClick={onClick}
          aria-label={`${label} ${count}개`}
          className={activitySummaryItem}
        >
          {content}
        </button>
      </li>
    );
  }

  return (
    <li className={activitySummaryItem} aria-label={`${label} ${count}개`}>
      {content}
    </li>
  );
}
