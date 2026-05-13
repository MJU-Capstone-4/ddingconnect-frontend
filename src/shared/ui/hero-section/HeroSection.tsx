import type { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';
import { heroSectionVariants } from './hero-section.styles';
import type { HeroSectionVariant } from './hero-section.styles';

export type HeroSectionProps = {
  title: string;
  description?: string;
  variant?: HeroSectionVariant;
  icon?: ReactNode;
  action?: ReactNode;
  collapsed?: boolean;
  className?: string;
  contentClassName?: string;
};

export function HeroSection({
  title,
  description,
  variant = 'primary',
  icon,
  action,
  collapsed = false,
  className,
  contentClassName,
}: HeroSectionProps) {
  return (
    <section className={cn(heroSectionVariants({ variant, collapsed }), className)}>
      {!collapsed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-6 -top-6 size-32 rounded-full bg-white/15" />
          <div className="absolute -bottom-10 -left-8 size-40 rounded-full bg-white/10" />
        </div>
      )}

      <div className={cn('relative flex items-center gap-4', contentClassName)}>
        {icon && (
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-full bg-white/20',
              collapsed ? 'size-10' : 'size-14',
            )}
          >
            {icon}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className={cn('font-bold text-text-on-primary', collapsed ? 'text-base' : 'text-xl')}>
            {title}
          </h2>
          {description && !collapsed && (
            <p className="mt-1 text-sm text-text-on-primary/80">{description}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </section>
  );
}
