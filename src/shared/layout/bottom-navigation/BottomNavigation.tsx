import HomeIcon from '@/shared/assets/icons/bottom-home.svg?react';
import CoffeeChatIcon from '@/shared/assets/icons/bottom-coffee-chat.svg?react';
import RoadmapIcon from '@/shared/assets/icons/bottom-roadmap.svg?react';
import QnaIcon from '@/shared/assets/icons/bottom-qna.svg?react';
import ProfileIcon from '@/shared/assets/icons/bottom-profile.svg?react';
import { cn } from '@/shared/utils/cn';
import {
  navRoot,
  navList,
  navItemButton,
  navIcon,
  navLabel,
  activeStyle,
  inactiveStyle,
} from './bottom-navigation.styles';

export type BottomNavigationItem = {
  key: 'home' | 'coffeeChat' | 'roadmap' | 'qna' | 'my';
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type BottomNavigationProps = {
  activeKey?: BottomNavigationItem['key'];
  items?: BottomNavigationItem[];
  onItemClick?: (item: BottomNavigationItem) => void;
  className?: string;
};

const DEFAULT_ITEMS: BottomNavigationItem[] = [
  {
    key: 'home',
    label: '홈',
    href: '/',
    icon: <HomeIcon className={navIcon} aria-hidden="true" />,
  },
  {
    key: 'coffeeChat',
    label: '커피챗',
    href: '/coffee-chat',
    icon: <CoffeeChatIcon className={navIcon} aria-hidden="true" />,
  },
  {
    key: 'roadmap',
    label: '로드맵',
    href: '/roadmap',
    icon: <RoadmapIcon className={navIcon} aria-hidden="true" />,
  },
  {
    key: 'qna',
    label: 'QnA',
    href: '/qna',
    icon: <QnaIcon className={navIcon} aria-hidden="true" />,
  },
  {
    key: 'my',
    label: '마이',
    href: '/my',
    icon: <ProfileIcon className={navIcon} aria-hidden="true" />,
  },
];

export function BottomNavigation({
  activeKey,
  items = DEFAULT_ITEMS,
  onItemClick,
  className,
}: BottomNavigationProps) {
  return (
    <nav aria-label="하단 네비게이션" className={cn(navRoot, className)}>
      <ul className={navList}>
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <li key={item.key} className="flex-1">
              <button
                type="button"
                className={cn(navItemButton, isActive ? activeStyle : inactiveStyle)}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onItemClick?.(item)}
              >
                {item.icon}
                <span className={navLabel}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
