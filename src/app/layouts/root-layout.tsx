import { Outlet, useLocation } from 'react-router';
import { AppHeader, BottomNavigation, PageLayout } from '@/shared/layout';
import type { BottomNavigationItem } from '@/shared/layout/bottom-navigation';

function getActiveKey(pathname: string): BottomNavigationItem['key'] | undefined {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/coffee-chat')) return 'coffeeChat';
  if (pathname.startsWith('/career-map')) return 'roadmap';
  if (pathname.startsWith('/qna')) return 'qna';
  if (pathname.startsWith('/my-page') || pathname.startsWith('/my/')) return 'my';
  return undefined;
}

const HIDE_HEADER_PATHS = ['/'];

export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <div className="h-dvh bg-background overflow-hidden">
      <div className="w-full max-w-[430px] mx-auto h-full bg-surface flex flex-col">
        {!HIDE_HEADER_PATHS.includes(pathname) && <AppHeader />}
        <PageLayout>
          <Outlet />
        </PageLayout>
        <BottomNavigation activeKey={getActiveKey(pathname)} />
      </div>
    </div>
  );
}
