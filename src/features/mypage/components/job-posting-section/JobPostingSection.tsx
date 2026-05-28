import BagIcon from '@/shared/assets/icons/bag.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import { cn } from '@/shared/utils/cn';

import * as S from './job-posting-section.styles';

export type JobPostingSectionProps = {
  title?: string;
  link?: string;
  onClick?: () => void;
  className?: string;
};

export function JobPostingSection({
  title = '이 선배의 공고',
  link,
  onClick,
  className,
}: JobPostingSectionProps) {
  const hasLink = Boolean(link);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <section className={cn(S.section, className)} aria-label={title}>
      <h2 className={S.sectionTitle}>{title}</h2>

      {hasLink ? (
        <div
          className={S.cardRow}
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          aria-label="공고 보기"
        >
          <span className={S.iconWrapper}>
            <BagIcon className={S.bagIcon} aria-hidden="true" />
          </span>
          <div className={S.textContent}>
            <span className={S.textLabel}>공고 링크</span>
            <span className={S.textMain}>{link}</span>
          </div>
          <ChevronRightIcon className={S.chevronIcon} aria-hidden="true" />
        </div>
      ) : (
        <div className={S.emptyRow}>
          <span className={S.emptyText}>등록된 공고가 없습니다</span>
        </div>
      )}
    </section>
  );
}
