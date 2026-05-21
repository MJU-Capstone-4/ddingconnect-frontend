import PointIcon from '@/shared/assets/icons/point.svg?react';
import { Chip } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import {
  container,
  row,
  leftGroup,
  iconWrap,
  icon,
  tokenText,
  divider,
} from './point-charge-option.styles';

export type PointChargeOptionProps = {
  tokenAmount: number;
  price: number;
  showDivider?: boolean;
  onClick?: () => void;
  className?: string;
};

export function PointChargeOption({
  tokenAmount,
  price,
  showDivider = true,
  onClick,
  className,
}: PointChargeOptionProps) {
  return (
    <div className={cn(container, className)}>
      <div className={row}>
        <div className={leftGroup}>
          <div className={iconWrap}>
            <PointIcon className={icon} aria-hidden="true" />
          </div>
          <span className={tokenText}>{tokenAmount}토큰</span>
        </div>
        <Chip
          variant="filled"
          active={true}
          size="lg"
          type="button"
          aria-label={`${tokenAmount}토큰 충전하기`}
          onClick={onClick}
        >
          ₩{price.toLocaleString('ko-KR')}
        </Chip>
      </div>
      {showDivider && <hr className={divider} />}
    </div>
  );
}
