import { forwardRef, useId } from 'react';
import type { ComponentType, SVGProps } from 'react';

import { cn } from '@/shared/utils/cn';

import {
  inputBoxVariants,
  inputFieldBase,
  inputIconBase,
  inputIconButton,
  inputIconSizeMap,
  inputLabel,
  inputHelperText,
  inputError,
  inputTextSizeMap,
  type InputSize,
} from './input.styles';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  leftIcon?: SvgIcon;
  rightIcon?: SvgIcon;
  inputClassName?: string;
  wrapperClassName?: string;
};

export type InputProps = InputBaseProps &
  (
    | { onRightIconClick?: undefined; rightIconLabel?: string }
    | { onRightIconClick: () => void; rightIconLabel: string }
  );

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    size = 'default',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onRightIconClick,
    rightIconLabel,
    inputClassName,
    wrapperClassName,
    id: idProp,
    className,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = idProp ?? autoId;
  const errorId = `${inputId}-error`;
  const iconSize = inputIconSizeMap[size];
  const textSize = inputTextSizeMap[size];

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className={inputLabel}>
          {label}
        </label>
      )}

      <div className={cn(inputBoxVariants({ size, hasError: !!error }), className)}>
        {LeftIcon && <LeftIcon className={cn(iconSize, inputIconBase)} aria-hidden="true" />}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputFieldBase, textSize, inputClassName)}
          {...rest}
        />

        {RightIcon &&
          (onRightIconClick ? (
            <button
              type="button"
              onClick={onRightIconClick}
              aria-label={rightIconLabel}
              className={inputIconButton}
            >
              <RightIcon className={cn(iconSize)} aria-hidden="true" />
            </button>
          ) : (
            <RightIcon className={cn(iconSize, inputIconBase)} aria-hidden="true" />
          ))}
      </div>

      {helperText && !error && <p className={inputHelperText}>{helperText}</p>}

      {error && (
        <p id={errorId} role="alert" className={inputError}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
