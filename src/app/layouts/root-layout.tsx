import { Outlet } from 'react-router';
import { AppHeader, BottomNav, PageLayout } from '@/shared/layout';

export function RootLayout() {
  return (
    <div className="h-dvh bg-background overflow-hidden">
      <div className="w-full max-w-[430px] mx-auto h-full bg-surface flex flex-col">
        <AppHeader />
        <PageLayout>
          <Outlet />
        </PageLayout>
        <BottomNav />
      </div>
    </div>
  );
}
