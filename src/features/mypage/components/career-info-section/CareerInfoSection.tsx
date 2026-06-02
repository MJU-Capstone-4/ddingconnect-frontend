import { Fragment, useState } from 'react';

import { Chip } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import CloseIcon from '@/shared/assets/icons/close.svg?react';

import * as S from './career-info-section.styles';

export type CareerInfoGroup = {
  label: string;
  items: string[];
  tone: 'blue' | 'gray';
  placeholder?: string;
  options?: string[];
};

export type CareerInfoSectionProps = {
  title: string;
  mode?: 'view' | 'edit';
  groups: CareerInfoGroup[];
  onAddItem?: (groupLabel: string, value: string) => void;
  onRemoveItem?: (groupLabel: string, item: string) => void;
  className?: string;
};

const CHIP_SIZE = {
  blue: 'md',
  gray: 'sm',
} as const;

type GroupInputProps = {
  groupLabel: string;
  placeholder: string;
  items: string[];
  onAdd: (groupLabel: string, value: string) => void;
  options?: string[];
};

function GroupInput({ groupLabel, placeholder, items, onAdd, options }: GroupInputProps) {
  const [value, setValue] = useState('');
  const listId = options ? `datalist-${groupLabel.replace(/\s+/g, '-')}` : undefined;

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && !items.includes(trimmed)) {
      if (options && !options.includes(trimmed)) return;
      onAdd(groupLabel, trimmed);
      setValue('');
    }
  };

  return (
    <>
      {options && (
        <datalist id={listId}>
          {options
            .filter((opt) => !items.includes(opt))
            .map((opt) => (
              <option key={opt} value={opt} />
            ))}
        </datalist>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            commit();
          }
        }}
        onBlur={commit}
        placeholder={placeholder}
        aria-label={placeholder}
        list={listId}
        className={S.groupInput}
      />
    </>
  );
}

export function CareerInfoSection({
  title,
  mode = 'view',
  groups,
  onAddItem,
  onRemoveItem,
  className,
}: CareerInfoSectionProps) {
  return (
    <section className={cn(S.section, className)}>
      <h2 className={S.sectionTitle}>{title}</h2>

      <div className={S.groupsWrapper}>
        {groups.map((group, index) => (
          <Fragment key={group.label}>
            {index > 0 && <div role="separator" className={S.groupDivider} />}
            <div className={S.group}>
              <span className={S.groupLabel}>{group.label}</span>
              <div className={S.chipList}>
                {group.items.map((item) =>
                  mode === 'edit' ? (
                    <Chip
                      key={item}
                      tone={group.tone}
                      size={CHIP_SIZE[group.tone]}
                      rightIcon={CloseIcon}
                      onClick={() => onRemoveItem?.(group.label, item)}
                      aria-label={`${item} 삭제`}
                    >
                      {item}
                    </Chip>
                  ) : (
                    <Chip
                      key={item}
                      tone={group.tone}
                      size={CHIP_SIZE[group.tone]}
                      className={S.viewChip}
                    >
                      {item}
                    </Chip>
                  ),
                )}
                {mode === 'edit' && onAddItem && (
                  <GroupInput
                    groupLabel={group.label}
                    placeholder={group.placeholder ?? `${group.label} 입력하기`}
                    items={group.items}
                    onAdd={onAddItem}
                    options={group.options}
                  />
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
