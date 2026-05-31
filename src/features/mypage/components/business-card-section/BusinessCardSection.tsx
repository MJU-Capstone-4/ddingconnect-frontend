import { useState } from 'react';

import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import * as S from './business-card-section.styles';

export type BusinessCardSectionProps = {
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  businessCardImage?: string;
  className?: string;
};

export function BusinessCardSection({
  title = '선배 명함',
  buttonLabel = '명함 저장하기',
  onButtonClick,
  businessCardImage,
  className,
}: BusinessCardSectionProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <section className={cn(S.section, className)} aria-label={title}>
      <h2 className={S.sectionTitle}>{title}</h2>

      <div className={S.previewArea} aria-label="명함 미리보기">
        {businessCardImage && !hasImageError ? (
          <img
            src={businessCardImage}
            alt="선배 명함"
            className="w-full h-full object-contain"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <p className="text-sm text-text-secondary" aria-label="등록된 명함이 없습니다">
            등록된 명함이 없습니다
          </p>
        )}
      </div>

      <Button type="button" tone="blue" size="accountSetting" fullWidth onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </section>
  );
}
