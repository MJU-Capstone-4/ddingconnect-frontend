import type { ReactNode } from 'react';

import { Input } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import * as S from './basic-info-section.styles';

export type BasicInfoItem = {
  label: string;
  value: string;
  icon: ReactNode;
  iconWrapperClassName?: string;
  onChange?: (value: string) => void;
};

export type BasicInfoSectionMode = 'view' | 'edit';

export type BasicInfoSectionProps = {
  mode?: BasicInfoSectionMode;
  items: BasicInfoItem[];
  className?: string;
};

export function BasicInfoSection({ mode = 'view', items, className }: BasicInfoSectionProps) {
  return (
    <section className={cn(S.section, className)}>
      <h2 className={S.sectionTitle}>기본 정보</h2>

      <ul>
        {items.map((item, index) => (
          <li key={index} className={S.infoRow}>
            <div className={cn(S.iconWrapper, item.iconWrapperClassName)} aria-hidden="true">
              {item.icon}
            </div>

            <div className={S.itemContent}>
              <span className={S.itemLabel}>{item.label}</span>

              {mode === 'view' ? (
                <p className={S.itemValue}>{item.value}</p>
              ) : (
                <Input
                  value={item.value}
                  onChange={item.onChange ? (e) => item.onChange!(e.target.value) : undefined}
                  readOnly={!item.onChange}
                  aria-label={item.label}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
