import { forwardRef, useEffect, useId, useRef, useState } from 'react';

import ChevronDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  selectWrapper,
  selectLabel,
  selectTrigger,
  selectTriggerPlaceholder,
  selectTriggerError,
  selectTriggerOpen,
  selectChevron,
  selectChevronOpen,
  selectDropdown,
  selectOption,
  selectOptionSelected,
  selectErrorText,
} from './select.styles';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  label?: string;
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  selectClassName?: string;
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    label,
    id: idProp,
    options,
    placeholder,
    error,
    value,
    onChange,
    required,
    disabled,
    fullWidth,
    className,
    selectClassName,
  },
  ref,
) {
  const autoId = useId();
  const selectId = idProp ?? autoId;
  const errorId = `${selectId}-error`;
  const listboxId = `${selectId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const isEmpty = !selectedOption;

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

  function handleSelect(optValue: string) {
    onChange?.(optValue);
    setIsOpen(false);
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
          ref={ref}
          type="button"
          id={selectId}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            selectTrigger,
            isEmpty && selectTriggerPlaceholder,
            error && selectTriggerError,
            isOpen && selectTriggerOpen,
            selectClassName,
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : (placeholder ?? '')}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(selectChevron, isOpen && selectChevronOpen)}
          />
        </button>

        {isOpen && (
          <ul id={listboxId} role="listbox" aria-label={label} className={selectDropdown}>
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => handleSelect(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(opt.value);
                    }
                  }}
                  className={cn(selectOption, isSelected && selectOptionSelected)}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className={selectErrorText}>
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
