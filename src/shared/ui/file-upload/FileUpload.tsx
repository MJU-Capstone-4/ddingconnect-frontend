import { forwardRef, useCallback, useId, useRef, useState } from 'react';

import UploadIcon from '@/shared/assets/icons/upload.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  fileUploadContent,
  fileUploadDescriptionBase,
  fileUploadDescriptionVariantMap,
  fileUploadErrorText,
  fileUploadFileName,
  fileUploadIconBase,
  fileUploadIconVariantMap,
  fileUploadInput,
  fileUploadRoot,
  fileUploadRootDefault,
  fileUploadRootDisabled,
  fileUploadRootError,
  fileUploadTitleBase,
  fileUploadTitleVariantMap,
  fileUploadVariantMap,
} from './file-upload.styles';

export type FileUploadVariant = 'signup' | 'modal';

export type FileUploadProps = {
  file?: File | null;
  onFileChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  error?: string;
  title?: string;
  description?: string;
  variant?: FileUploadVariant;
  className?: string;
  inputId?: string;
};

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    file,
    onFileChange,
    accept = 'application/pdf',
    disabled = false,
    error,
    title = '파일을 업로드 해주세요',
    description = 'PDF 형식의 파일만 가능합니다 (최대 0MB)',
    variant = 'signup',
    className,
    inputId: inputIdProp,
  },
  ref,
) {
  const autoId = useId();
  const inputId = inputIdProp ?? autoId;
  const errorId = `${inputId}-error`;

  const isControlled = file !== undefined;
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const displayFile = isControlled ? file : internalFile;

  const localInputRef = useRef<HTMLInputElement>(null);

  const inputCallbackRef = useCallback(
    (el: HTMLInputElement | null) => {
      localInputRef.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    },
    [ref],
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    if (!isControlled) setInternalFile(selected);
    onFileChange?.(selected);
    e.target.value = '';
  }

  function handleClick(e: React.MouseEvent<HTMLLabelElement>) {
    if (disabled) e.preventDefault();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      localInputRef.current?.click();
    }
  }

  return (
    <div className={cn('flex flex-col w-fit', className)}>
      <label
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          fileUploadRoot,
          error ? fileUploadRootError : fileUploadRootDefault,
          disabled && fileUploadRootDisabled,
          fileUploadVariantMap[variant],
        )}
      >
        <UploadIcon
          aria-hidden="true"
          className={cn(fileUploadIconBase, fileUploadIconVariantMap[variant])}
        />

        {displayFile ? (
          <span className={fileUploadFileName}>{displayFile.name}</span>
        ) : (
          <div className={fileUploadContent}>
            <span className={cn(fileUploadTitleBase, fileUploadTitleVariantMap[variant])}>
              {title}
            </span>
            <span
              className={cn(fileUploadDescriptionBase, fileUploadDescriptionVariantMap[variant])}
            >
              {description}
            </span>
          </div>
        )}

        <input
          ref={inputCallbackRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          tabIndex={-1}
          onChange={handleChange}
          className={cn(fileUploadInput, disabled && 'pointer-events-none')}
        />
      </label>

      {error && (
        <p id={errorId} role="alert" className={fileUploadErrorText}>
          {error}
        </p>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
