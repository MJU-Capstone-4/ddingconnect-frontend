import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import PortfolioIcon from '@/shared/assets/icons/portfolio.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import * as S from './portfolio-section.styles';

type PortfolioSectionMode = 'view' | 'edit';

type PortfolioData = {
  title: string;
  url: string;
};

export type PortfolioSectionProps = {
  mode?: PortfolioSectionMode;
  portfolio?: PortfolioData | null;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
};

export function PortfolioSection({
  mode = 'view',
  portfolio,
  onClick,
  onDelete,
  className,
}: PortfolioSectionProps) {
  const isEdit = mode === 'edit';
  const isEmpty = !portfolio;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <section className={cn(S.section, className)}>
      <h2 className={S.sectionTitle}>{isEdit ? '나의 포트폴리오 올리기' : '포트폴리오'}</h2>

      {isEmpty ? (
        <div
          className={S.cardRowClickable}
          {...(onClick && {
            role: 'button' as const,
            tabIndex: 0,
            onClick,
            onKeyDown: handleKeyDown,
            'aria-label': '포트폴리오 업로드',
          })}
        >
          <span className={cn(S.iconWrapperBase, S.iconWrapperEmpty)}>
            <PlusIcon className={S.plusIcon} aria-hidden="true" />
          </span>
          <div className={S.textContent}>
            <span className={S.textLabel}>{isEdit ? '포트폴리오 올리기' : '포트폴리오 링크'}</span>
            <span className={S.textMain}>포트폴리오를 업로드해주세요</span>
          </div>
          <ChevronRightIcon className={S.chevronIcon} aria-hidden="true" />
        </div>
      ) : isEdit ? (
        <div className={S.cardRow}>
          <span className={cn(S.iconWrapperBase, S.iconWrapperFilled)}>
            <PortfolioIcon className={S.portfolioIcon} aria-hidden="true" />
          </span>
          <div className={S.textContent}>
            <span className={S.textLabel}>포트폴리오 올리기</span>
            <span className={S.textMain}>{portfolio?.url ?? ''}</span>
          </div>
          <Button
            type="button"
            size="delete"
            tone="red"
            onClick={onDelete}
            disabled={!onDelete}
            aria-label="포트폴리오 삭제"
          >
            삭제
          </Button>
        </div>
      ) : (
        <div
          className={S.cardRowClickable}
          {...(onClick && {
            role: 'button' as const,
            tabIndex: 0,
            onClick,
            onKeyDown: handleKeyDown,
            'aria-label': `${portfolio!.title} 보기`,
          })}
        >
          <span className={cn(S.iconWrapperBase, S.iconWrapperFilled)}>
            <PortfolioIcon className={S.portfolioIcon} aria-hidden="true" />
          </span>
          <div className={S.textContent}>
            <span className={S.textLabel}>포트폴리오 링크</span>
            <span className={S.textMain}>{portfolio!.url}</span>
          </div>
          <ChevronRightIcon className={S.chevronIcon} aria-hidden="true" />
        </div>
      )}
    </section>
  );
}
