import { forwardRef, useId } from 'react';

import { cn } from '@/shared/utils/cn';

import {
  fieldWrapper,
  fieldLabel,
  fieldLabelAsterisk,
  fieldInputBase,
  fieldInputError,
  fieldInputSingle,
  fieldInputMulti,
  fieldErrorText,
} from './form-field.styles';

export type FormFieldElement = HTMLInputElement | HTMLTextAreaElement;

export type FormFieldProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
};

export const FormField = forwardRef<FormFieldElement, FormFieldProps>(function FormField(
  {
    label,
    id: idProp,
    placeholder,
    value,
    onChange,
    disabled = false,
    error,
    required = false,
    multiline = false,
    rows = 4,
    className,
    inputClassName,
  },
  ref,
) {
  const autoId = useId();
  const inputId = idProp ?? autoId;
  const errorId = `${inputId}-error`;

  const inputClass = cn(fieldInputBase, error && fieldInputError, inputClassName);

  return (
    <div className={cn(fieldWrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={fieldLabel}>
          {label}
          {required && (
            <span aria-hidden="true" className={fieldLabelAsterisk}>
              {' '}
              *
            </span>
          )}
        </label>
      )}

      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={inputId}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClass, fieldInputMulti)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          type="text"
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClass, fieldInputSingle)}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className={fieldErrorText}>
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
