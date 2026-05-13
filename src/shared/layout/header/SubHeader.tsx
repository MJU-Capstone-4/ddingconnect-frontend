import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg?react';
import { cn } from '@/shared/utils/cn';
import { headerBase, iconButtonBase } from './header.styles';

export type SubHeaderProps = {
  title: string;
  onBackClick?: () => void;
  className?: string;
};

export function SubHeader({ title, onBackClick, className }: SubHeaderProps) {
  return (
    <header className={cn(headerBase, 'h-header gap-2 bg-surface', className)}>
      <button
        type="button"
        className={cn(iconButtonBase, '-ml-2 text-text-primary')}
        onClick={onBackClick}
        aria-label="뒤로가기"
      >
        <ArrowLeftIcon className="w-[23px] h-[23px]" />
      </button>

      <h1 className="text-[20px] font-bold text-text-primary">{title}</h1>
    </header>
  );
}
