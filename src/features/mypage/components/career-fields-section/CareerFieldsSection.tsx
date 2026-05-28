import type { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

import * as S from './career-fields-section.styles';

export type CareerField = {
  label: string;
  value: string;
  icon: ReactNode;
  iconClassName?: string;
};

export type CareerFieldsSectionProps = {
  title?: string;
  fields: CareerField[];
  className?: string;
};

export function CareerFieldsSection({
  title = '경력 정보',
  fields,
  className,
}: CareerFieldsSectionProps) {
  return (
    <section className={cn(S.section, className)} aria-label={title}>
      <h2 className={S.sectionTitle}>{title}</h2>
      <ul>
        {fields.map((field) => (
          <li key={field.label} className={S.row}>
            <div className={cn(S.iconWrapper, field.iconClassName)} aria-hidden="true">
              {field.icon}
            </div>
            <div className={S.content}>
              <span className={S.label}>{field.label}</span>
              <p className={S.value}>{field.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
