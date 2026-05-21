import BagIcon from '@/shared/assets/icons/bag.svg?react';
import ClockIcon from '@/shared/assets/icons/clock.svg?react';
import { Button, Chip } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import {
  card,
  profileRow,
  profileImage,
  profilePlaceholder,
  nameGroup,
  name as nameStyle,
  department as departmentStyle,
  infoList,
  infoRow,
  infoText,
  infoIcon,
  chipRow,
} from './senior-profile-card.styles';

export type SeniorProfileCardProps = {
  profileImage?: string;
  name: string;
  department: string;
  company: string;
  job: string;
  career: string;
  techStacks: string[];
  onClick: () => void;
  className?: string;
};

export function SeniorProfileCard({
  profileImage: profileImageSrc,
  name,
  department,
  company,
  job,
  career,
  techStacks,
  onClick,
  className,
}: SeniorProfileCardProps) {
  return (
    <div className={cn(card, className)}>
      <div className={profileRow}>
        {profileImageSrc ? (
          <img src={profileImageSrc} alt={`${name} 프로필`} className={profileImage} />
        ) : (
          <div className={profilePlaceholder} aria-hidden="true" />
        )}
        <div className={nameGroup}>
          <p className={nameStyle}>{name}</p>
          <p className={departmentStyle}>{department}</p>
        </div>
      </div>

      <div className={infoList}>
        <div className={infoRow}>
          <BagIcon className={infoIcon} aria-hidden="true" />
          <span className={infoText}>
            {company} • {job}
          </span>
        </div>
        <div className={infoRow}>
          <ClockIcon className={infoIcon} aria-hidden="true" />
          <span className={infoText}>{career}</span>
        </div>
      </div>

      {techStacks.length > 0 && (
        <div className={chipRow}>
          {techStacks.map((stack) => (
            <Chip key={stack} variant="outlined" size="sm">
              {stack}
            </Chip>
          ))}
        </div>
      )}

      <Button
        fullWidth
        size="jobApply"
        tone="blue"
        variant="solid"
        type="button"
        aria-label={`${name} 선배 페이지 둘러보기`}
        onClick={onClick}
      >
        선배 페이지 둘러보기
      </Button>
    </div>
  );
}
