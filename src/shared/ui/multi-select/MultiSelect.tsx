import { useEffect, useId, useRef, useState } from 'react';

import ChevronDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import { cn } from '@/shared/utils/cn';

import { Chip } from '../chip';
import type { ChipProps } from '../chip';
import {
  selectWrapper,
  selectLabel,
  selectTrigger,
  selectTriggerPlaceholder,
  selectTriggerOpen,
  selectChevron,
  selectChevronOpen,
  selectDropdown,
  selectOption,
} from '../select/select.styles';
import { multiSelectChipList } from './multi-select.styles';

export type MultiSelectProps = {
  label?: string;
  id?: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  chipTone?: NonNullable<ChipProps['tone']>;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export function MultiSelect({
  label,
  id: idProp,
  options,
  value,
  onChange,
  placeholder,
  chipTone = 'gray',
  required,
  disabled,
  fullWidth = true,
  className,
}: MultiSelectProps) {
  const autoId = useId();
  const selectId = idProp ?? autoId;
  const listboxId = `${selectId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const availableOptions = options.filter((opt) => !value.includes(opt));

  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  function handleSelect(option: string) {
    onChange([...value, option]);
    setIsOpen(false);
  }

  function handleRemove(option: string) {
    onChange(value.filter((v) => v !== option));
  }

  return (
    <div ref={containerRef} className={cn(selectWrapper, className)}>
      {label && (
        <label htmlFor={selectId} className={selectLabel}>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-error">
              {' '}
              *
            </span>
          )}
        </label>
      )}

      <div className={cn('relative', fullWidth ? 'w-full' : 'w-[147px]')}>
        <button
          type="button"
          id={selectId}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          disabled={disabled || availableOptions.length === 0}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(selectTrigger, selectTriggerPlaceholder, isOpen && selectTriggerOpen)}
        >
          <span className="truncate">{placeholder ?? ''}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(selectChevron, isOpen && selectChevronOpen)}
          />
        </button>

        {isOpen && availableOptions.length > 0 && (
          <ul id={listboxId} role="listbox" aria-label={label} className={selectDropdown}>
            {availableOptions.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={false}
                tabIndex={0}
                onClick={() => handleSelect(opt)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(opt);
                  }
                }}
                className={selectOption}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>

      {value.length > 0 && (
        <div className={multiSelectChipList}>
          {value.map((item) => (
            <Chip
              key={item}
              tone={chipTone}
              size="sm"
              rightIcon={CloseIcon}
              onClick={() => handleRemove(item)}
              aria-label={`${item} 삭제`}
            >
              {item}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

MultiSelect.displayName = 'MultiSelect';
