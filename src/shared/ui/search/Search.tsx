import { forwardRef } from 'react';

import SearchIcon from '@/shared/assets/icons/search.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  searchInputWrapper,
  searchInput,
  searchIconBase,
  searchWidthMap,
  iconPaddingMap,
} from './search.styles';

export type SearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  width?: 'jobInfo' | 'qna' | 'full';
  iconPosition?: 'left' | 'right';
  className?: string;
  inputClassName?: string;
};

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    width = 'full',
    iconPosition = 'left',
    className,
    inputClassName,
    disabled,
    'aria-label': ariaLabel,
    placeholder = '검색어를 입력해주세요',
    ...rest
  },
  ref,
) {
  const positionStyles = iconPaddingMap[iconPosition];

  return (
    <div className={cn(searchInputWrapper, searchWidthMap[width], className)}>
      <SearchIcon aria-hidden="true" className={cn(searchIconBase, positionStyles.icon)} />
      <input
        ref={ref}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel ?? '검색어 입력'}
        className={cn(
          searchInput,
          positionStyles.input,
          positionStyles.inputIndent,
          inputClassName,
        )}
        {...rest}
      />
    </div>
  );
});

Search.displayName = 'Search';
