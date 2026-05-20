import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '@/shared/assets/icons/close.svg?react';
import { cn } from '@/shared/utils/cn';

import {
  type ModalContentSize,
  type ModalFooterLayout,
  type ModalHeaderLayout,
  type ModalTone,
  modalBodyClass,
  modalCloseClass,
  modalContentDecoration1,
  modalContentDecoration2,
  modalContentDecorationToneMap,
  modalContentVariants,
  modalDescriptionClass,
  modalFooterVariants,
  modalHeaderDecoration1,
  modalHeaderDecoration2,
  modalHeaderDecorationBase,
  modalHeaderVariants,
  modalIconClass,
  modalOverlayClass,
  modalTitleClass,
  modalWrapperClass,
} from './modal.styles';

export type { ModalTone, ModalContentSize };

type ModalContextValue = {
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal compound components must be used within <Modal>');
  return ctx;
}

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
};

type ModalContentProps = {
  size?: ModalContentSize;
  children: React.ReactNode;
  className?: string;
  withDecoration?: boolean;
  decorationTone?: ModalTone;
};

type ModalHeaderProps = {
  tone?: ModalTone;
  layout?: ModalHeaderLayout;
  children: React.ReactNode;
  withDecoration?: boolean;
  className?: string;
};

type ModalFooterProps = {
  layout?: ModalFooterLayout;
  children: React.ReactNode;
  className?: string;
};

function ModalRoot({
  open,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [overlayInteractive, setOverlayInteractive] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOverlayInteractive(true), 80);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEscape, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ onOpenChange, titleId, descriptionId }}>
      <div className={modalOverlayClass} aria-hidden="true" />
      <div
        className={cn(modalWrapperClass, !overlayInteractive && 'pointer-events-none')}
        onMouseDown={
          overlayInteractive && closeOnOverlayClick
            ? (e) => {
                if (e.target === e.currentTarget) onOpenChange(false);
              }
            : undefined
        }
      >
        {children}
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

function ModalContent({
  size = 'sm',
  children,
  className,
  withDecoration = false,
  decorationTone,
}: ModalContentProps) {
  const { titleId, descriptionId } = useModalContext();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialog.focus();

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusables() {
      return Array.from(dialog!.querySelectorAll<HTMLElement>(FOCUSABLE));
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusables = getFocusables();
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === dialog) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || document.activeElement === dialog) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  const decoColor = decorationTone ? modalContentDecorationToneMap[decorationTone] : '';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      className={cn(modalContentVariants({ size }), 'outline-none', className)}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {withDecoration && decorationTone && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className={cn('absolute rounded-full', modalContentDecoration1, decoColor)} />
          <div className={cn('absolute rounded-full', modalContentDecoration2, decoColor)} />
        </div>
      )}
      {children}
    </div>
  );
}

function ModalHeader({
  tone = 'blue',
  layout = 'stacked',
  children,
  withDecoration = true,
  className,
}: ModalHeaderProps) {
  return (
    <div className={cn(modalHeaderVariants({ tone, layout }), className)}>
      {withDecoration && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className={cn(modalHeaderDecorationBase, modalHeaderDecoration1)} />
          <div className={cn(modalHeaderDecorationBase, modalHeaderDecoration2)} />
        </div>
      )}
      {children}
    </div>
  );
}

function ModalTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const { titleId } = useModalContext();
  return (
    <h2 id={titleId} className={cn(modalTitleClass, className)}>
      {children}
    </h2>
  );
}

function ModalDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { descriptionId } = useModalContext();
  return (
    <p id={descriptionId} className={cn(modalDescriptionClass, className)}>
      {children}
    </p>
  );
}

function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(modalBodyClass, className)}>{children}</div>;
}

function ModalFooterComp({ layout = 'col', children, className }: ModalFooterProps) {
  return <div className={cn(modalFooterVariants({ layout }), className)}>{children}</div>;
}

function ModalClose({ className }: { className?: string }) {
  const { onOpenChange } = useModalContext();
  return (
    <button
      type="button"
      aria-label="모달 닫기"
      className={cn(modalCloseClass, className)}
      onClick={() => onOpenChange(false)}
    >
      <CloseIcon className="size-3.5" aria-hidden="true" />
    </button>
  );
}

function ModalIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={cn(modalIconClass, className)}>
      {children}
    </div>
  );
}

export const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooterComp,
  Close: ModalClose,
  Icon: ModalIcon,
});
