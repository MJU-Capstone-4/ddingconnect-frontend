import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="h-dvh bg-background overflow-hidden">
      <div className="w-full max-w-[430px] mx-auto h-full bg-background flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
