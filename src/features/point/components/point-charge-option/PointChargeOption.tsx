import PointIcon from '@/shared/assets/icons/point.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  container,
  row,
  leftGroup,
  icon,
  tokenText,
  popularLabel,
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
          <div className="flex flex-col">
            {isPopular && <span className={popularLabel}>인기</span>}
            <span className={tokenText}>{tokenAmount} 토큰</span>
          </div>
        </div>
        <button
          type="button"
          className="h-8 min-w-[74px] rounded-full border border-black/[0.18] bg-primary px-3 text-xs font-medium text-white hover:bg-primary-hover active:bg-primary-pressed"
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
