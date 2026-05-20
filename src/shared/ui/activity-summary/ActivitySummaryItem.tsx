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
};

export function ActivitySummaryItem({ icon: Icon, count, label, tone }: ActivitySummaryItemData) {
  return (
    <div className={activitySummaryItem} role="img" aria-label={`${label} ${count}개`}>
      <div className={cn(activitySummaryIconVariants({ tone }))} aria-hidden="true">
        <Icon className={activitySummaryIconSize} />
      </div>
      <p className={activitySummaryCount} aria-hidden="true">
        {count}
      </p>
      <span className={activitySummaryLabel} aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
