import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
  withSafeArea?: boolean;
};

export function PageLayout({
  children,
  className,
  withPadding = true,
  withSafeArea = true,
}: PageLayoutProps) {
  const classes = [
    'flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    withPadding && 'px-page-x pt-page-y',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = withSafeArea ? { paddingBottom: 'env(safe-area-inset-bottom, 0px)' } : undefined;

  return (
    <main className={classes} style={style}>
      {children}
    </main>
  );
}
