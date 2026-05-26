import PointIcon from '@/shared/assets/icons/point.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  container,
  row,
  leftGroup,
  labelColumn,
  icon,
  tokenText,
  popularLabel,
  priceButton,
  divider,
} from './point-charge-option.styles';

export type PointChargeOptionProps = {
  tokenAmount: number;
  price: number;
  isPopular?: boolean;
  showDivider?: boolean;
  onClick?: () => void;
  className?: string;
};

export function PointChargeOption({
  tokenAmount,
  price,
  isPopular,
  showDivider = true,
  onClick,
  className,
}: PointChargeOptionProps) {
  return (
    <div className={cn(container, className)}>
      <div className={row}>
        <div className={leftGroup}>
          <PointIcon className={icon} aria-hidden="true" />
          <div className={labelColumn}>
            {isPopular && <span className={popularLabel}>인기</span>}
            <span className={tokenText}>{tokenAmount} 토큰</span>
          </div>
        </div>
        <button
          type="button"
          className={priceButton}
          aria-label={`${tokenAmount}토큰 ₩${price.toLocaleString('ko-KR')} 충전하기`}
          onClick={onClick}
        >
          ₩{price.toLocaleString('ko-KR')}
        </button>
      </div>
      {showDivider && <hr className={divider} />}
    </div>
  );
}
