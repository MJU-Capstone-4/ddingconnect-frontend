import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import AlarmIcon from '@/shared/assets/icons/alarm.svg?react';
import { cn } from '@/shared/utils/cn';
import { headerBase, iconButtonBase } from './header.styles';

export type MainHeaderProps = {
  hasNotification?: boolean;
  onNotificationClick?: () => void;
  className?: string;
};

export function MainHeader({
  hasNotification = false,
  onNotificationClick,
  className,
}: MainHeaderProps) {
  return (
    <header className={cn(headerBase, 'h-header justify-between bg-surface z-header', className)}>
      <div aria-label="띵커넥트 홈">
        <LogoIcon className="w-8 h-8" aria-hidden="true" />
      </div>

      <button
        type="button"
        className={cn(iconButtonBase, 'relative -mr-2 text-text-primary')}
        onClick={onNotificationClick}
        aria-label={hasNotification ? '읽지 않은 알림 있음' : '알림'}
      >
        <AlarmIcon className="w-[23px] h-[23px]" />
        {hasNotification && (
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error"
            aria-hidden="true"
          />
        )}
      </button>
    </header>
  );
}
