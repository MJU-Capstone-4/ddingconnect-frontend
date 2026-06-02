import { Chip } from '@/shared/ui/chip';
import { cn } from '@/shared/utils/cn';

import type { CoffeeChatActivityItem } from '../../types';
import {
  card,
  infoRow,
  nameText,
  departmentText,
  tagRow,
} from './coffee-chat-activity-card.styles';

const STATUS_LABELS: Record<CoffeeChatActivityItem['status'], string> = {
  PENDING: '대기 중',
  ACCEPTED: '수락됨',
  REJECTED: '거절됨',
};

const STATUS_TONES = {
  PENDING: 'blue',
  ACCEPTED: 'green',
  REJECTED: 'pink',
} as const satisfies Record<CoffeeChatActivityItem['status'], 'blue' | 'green' | 'pink'>;

export type CoffeeChatActivityCardProps = CoffeeChatActivityItem & {
  className?: string;
};

export function CoffeeChatActivityCard({
  partnerNickname,
  partnerDepartment,
  partnerJobs,
  partnerTechStacks,
  status,
  className,
}: CoffeeChatActivityCardProps) {
  return (
    <div className={cn(card, className)}>
      <div className={infoRow}>
        <div>
          <p className={nameText}>{partnerNickname}</p>
          <p className={departmentText}>{partnerDepartment}</p>
        </div>
        <Chip size="sm" tone={STATUS_TONES[status]} className="pointer-events-none">
          {STATUS_LABELS[status]}
        </Chip>
      </div>

      {partnerJobs.length > 0 && (
        <div className={tagRow}>
          {partnerJobs.map((job) => (
            <Chip key={job} variant="outlined" size="sm" className="pointer-events-none">
              {job}
            </Chip>
          ))}
        </div>
      )}

      {partnerTechStacks.length > 0 && (
        <div className={tagRow}>
          {partnerTechStacks.map((stack) => (
            <Chip key={stack} variant="outlined" size="sm" className="pointer-events-none">
              {stack}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}
