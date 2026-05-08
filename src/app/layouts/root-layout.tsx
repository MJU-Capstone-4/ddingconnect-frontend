import { Outlet } from 'react-router';
import { AppHeader, BottomNav, PageLayout } from '@/shared/layout';

export function RootLayout() {
  return (
    <div>
      <AppHeader />
      <PageLayout>
        <Outlet />
      </PageLayout>
      <BottomNav />
    </div>
  );
}
