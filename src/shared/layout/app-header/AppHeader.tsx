import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import AlarmIcon from '@/shared/assets/icons/alarm.svg?react';
import { cn } from '@/shared/utils/cn';
import { headerBase, iconButtonBase } from '../header/header.styles';

export function AppHeader() {
  return (
    <header className={cn(headerBase, 'h-header justify-between bg-blue-50 shrink-0')}>
      <LogoIcon className="w-8 h-8" aria-hidden="true" />
      <button
        type="button"
        className={cn(iconButtonBase, 'relative -mr-2 text-text-primary')}
        aria-label="알림"
      >
        <AlarmIcon className="w-[23px] h-[23px]" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error" aria-hidden="true" />
      </button>
    </header>
  );
}
