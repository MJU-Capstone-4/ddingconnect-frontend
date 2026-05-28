import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import * as S from './business-card-section.styles';

export type BusinessCardSectionProps = {
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
};

export function BusinessCardSection({
  title = '선배 명함',
  buttonLabel = '명함 저장하기',
  onButtonClick,
  className,
}: BusinessCardSectionProps) {
  return (
    <section className={cn(S.section, className)} aria-label={title}>
      <h2 className={S.sectionTitle}>{title}</h2>

      <div className={S.previewArea} aria-label="명함 미리보기">
        <div className={S.previewPlaceholder} />
      </div>

      <Button type="button" tone="blue" size="accountSetting" fullWidth onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </section>
  );
}
