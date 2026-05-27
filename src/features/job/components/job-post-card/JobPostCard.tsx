import BagIcon from '@/shared/assets/icons/bag.svg?react';
import ClockIcon from '@/shared/assets/icons/clock.svg?react';
import DollarIcon from '@/shared/assets/icons/dollar.svg?react';
import LocationIcon from '@/shared/assets/icons/location.svg?react';
import { Button, Chip } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import {
  card,
  chipRow,
  companyNameStyle,
  dDayText,
  iconBox,
  iconBoxIcon,
  metaGrid,
  metaIcon,
  metaRow,
  metaText,
  nameGroup,
  newBadge,
  positionStyle,
  topRow,
} from './job-post-card.styles';

export type JobPostCardProps = {
  companyName: string;
  position: string;
  location: string;
  experience: string;
  salary: string;
  dDay: string;
  techStacks?: string[];
  isNew?: boolean;
  buttonTone?: 'blue' | 'green';
  onApply?: () => void;
  className?: string;
};

export function JobPostCard({
  companyName,
  position,
  location,
  experience,
  salary,
  dDay,
  techStacks,
  isNew,
  buttonTone = 'green',
  onApply,
  className,
}: JobPostCardProps) {
  return (
    <div className={cn(card, className)}>
      <div className={topRow}>
        <div className={iconBox}>
          <BagIcon className={iconBoxIcon} aria-hidden="true" />
        </div>
        <div className={nameGroup}>
          <p className={companyNameStyle}>{companyName}</p>
          <p className={positionStyle}>{position}</p>
        </div>
        {isNew && (
          <span className={newBadge} aria-label="신규 공고">
            NEW
          </span>
        )}
      </div>

      <div className={metaGrid}>
        <div className={metaRow}>
          <LocationIcon className={metaIcon} aria-hidden="true" />
          <span className={metaText}>{location}</span>
        </div>
        <div className={metaRow}>
          <BagIcon className={metaIcon} aria-hidden="true" />
          <span className={metaText}>{experience}</span>
        </div>
        <div className={metaRow}>
          <DollarIcon className={metaIcon} aria-hidden="true" />
          <span className={metaText}>{salary}</span>
        </div>
        <div className={metaRow}>
          <ClockIcon className={metaIcon} aria-hidden="true" />
          <span className={dDayText}>{dDay}</span>
        </div>
      </div>

      {techStacks && techStacks.length > 0 && (
        <div className={chipRow}>
          {techStacks.map((stack) => (
            <Chip key={stack} tone="blue" size="sm">
              {stack}
            </Chip>
          ))}
        </div>
      )}

      <Button
        className="mt-3"
        fullWidth
        size="jobApply"
        tone={buttonTone}
        variant="solid"
        type="button"
        aria-label={`${companyName} 지원하기`}
        onClick={onApply}
      >
        지원하기
      </Button>
    </div>
  );
}
