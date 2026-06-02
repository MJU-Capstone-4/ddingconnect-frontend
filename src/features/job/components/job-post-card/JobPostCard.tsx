import { useState } from 'react';

import BagIcon from '@/shared/assets/icons/bag.svg?react';
import ClockIcon from '@/shared/assets/icons/clock.svg?react';
import LocationIcon from '@/shared/assets/icons/location.svg?react';
import { Button, Chip } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import {
  card,
  chipRow,
  companyNameStyle,
  dDayText,
  graduateInfo,
  graduateSeparator,
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
  companyImage?: string;
  position: string;
  location: string;
  careerType: string;
  deadlineDisplay: string;
  dDay: string;
  isExpired?: boolean;
  techStacks?: string[];
  detailUrl?: string;
  graduate?: {
    nickname: string;
    department: string;
    jobType: string;
    careerYear: number;
  };
  isNew?: boolean;
  buttonTone?: 'blue' | 'green';
  className?: string;
};

export function JobPostCard({
  companyName,
  companyImage,
  position,
  location,
  careerType,
  deadlineDisplay,
  dDay,
  isExpired = false,
  techStacks,
  detailUrl,
  graduate,
  isNew = false,
  buttonTone = 'green',
  className,
}: JobPostCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasLink = Boolean(detailUrl);
  const isDisabled = !hasLink || isExpired;

  function handleApply() {
    if (!detailUrl) return;
    window.open(detailUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={cn(card, className)}>
      <div className={topRow}>
        <div className={iconBox}>
          {companyImage && !imgError ? (
            <img
              src={companyImage}
              alt={companyName}
              className="w-full h-full object-contain rounded-2xl"
              onError={() => setImgError(true)}
            />
          ) : (
            <BagIcon className={iconBoxIcon} aria-hidden="true" />
          )}
        </div>
        <div className={nameGroup}>
          <p className={companyNameStyle}>{companyName}</p>
          <p className={positionStyle}>{position}</p>
        </div>
        {isNew && <span className={newBadge}>NEW</span>}
      </div>

      <div className={metaGrid}>
        <div className={metaRow}>
          <LocationIcon className={metaIcon} aria-hidden="true" />
          <span className={metaText}>{location}</span>
        </div>
        <div className={metaRow}>
          <BagIcon className={metaIcon} aria-hidden="true" />
          <span className={metaText}>{careerType}</span>
        </div>
        <div className={metaRow}>
          <ClockIcon className={metaIcon} aria-hidden="true" />
          <span className={metaText}>{deadlineDisplay}</span>
        </div>
        <div className={metaRow}>
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

      {graduate && (
        <div className={graduateSeparator}>
          <p className={graduateInfo}>
            선배: {graduate.nickname} · {graduate.department} · {graduate.jobType} ·{' '}
            {graduate.careerYear}년차
          </p>
        </div>
      )}

      <Button
        className="mt-3"
        fullWidth
        size="jobApply"
        tone={buttonTone}
        variant="solid"
        type="button"
        disabled={isDisabled}
        aria-label={isExpired ? '마감된 공고' : `${companyName} 지원하기`}
        onClick={handleApply}
      >
        {isExpired ? '마감' : '지원하기'}
      </Button>
    </div>
  );
}
