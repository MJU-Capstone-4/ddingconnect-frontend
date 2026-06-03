import { RouterProvider } from 'react-router';
import { router } from '@/app/router';
import { QueryProvider } from '@/app/providers';

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
