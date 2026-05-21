import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import QnaIcon from '@/shared/assets/icons/bottom-qna.svg?react';
import RoadmapIcon from '@/shared/assets/icons/bottom-roadmap.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  card,
  cardClickable,
  iconWrapVariants,
  iconSize,
  content,
  titleStyle,
  descriptionStyle,
  timeStyleRead,
  timeStyleUnread,
  unreadDot,
} from './notification-item.styles';

export type NotificationType = 'coffeechat' | 'job' | 'qna' | 'roadmap';

export type NotificationItemProps = {
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  isUnread?: boolean;
  onClick?: () => void;
  className?: string;
};

const iconMap: Record<NotificationType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  coffeechat: CoffeeIcon,
  job: BagIcon,
  qna: QnaIcon,
  roadmap: RoadmapIcon,
};

export function NotificationItem({
  type,
  title,
  description,
  createdAt,
  isUnread = false,
  onClick,
  className,
}: NotificationItemProps) {
  const Icon = iconMap[type];
  const isClickable = !!onClick;

  return (
    <div
      className={cn(card, isClickable && cardClickable, className)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className={iconWrapVariants[type]}>
        <Icon className={iconSize} aria-hidden="true" />
      </div>

      <div className={content}>
        <p className={titleStyle}>{title}</p>
        <p className={descriptionStyle}>{description}</p>
        <time className={isUnread ? timeStyleUnread : timeStyleRead} dateTime={createdAt}>
          {createdAt}
        </time>
      </div>

      {isUnread && <span className={unreadDot} aria-hidden="true" />}
    </div>
  );
}
