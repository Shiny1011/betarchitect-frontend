'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/themes';

import CloseIcon from '@/Icons/CloseIcon';
import { cn } from '@/lib/utils';

interface IModalProps {
  title?: React.ReactNode;
  description?: string;
  open: boolean;
  onClose?: VoidFunction;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  backgroundImage?: React.ReactNode;
  withImageOverlay?: boolean;
  fullscreenOnMobile?: boolean;
}

export const Modal = (props: IModalProps) => {
  const {
    title,
    open,
    onClose,
    description,
    children,
    trigger,
    className,
    backgroundImage,
    withImageOverlay,
    fullscreenOnMobile,
  } = props;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose?.()}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={cn('fixed inset-0 z-[115] bg-black/50 backdrop-blur-sm')} />
        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-116 -translate-x-1/2 -translate-y-1/2',
            'max-h-[90vh] w-[90vw] max-w-lg',
            'bg-blue-indigo rounded-xl border border-[#22355A]',
            'text-white shadow-xl outline-none',
            'flex flex-col overflow-hidden',
            'px-5 pt-14 pb-6 md:px-6 md:pt-12 md:pb-8',
            fullscreenOnMobile &&
              'max-md:m-0 max-md:h-full max-md:max-h-[unset] max-md:w-full max-md:max-w-[unset] max-md:rounded-none',
            className
          )}
        >
          {backgroundImage && <div className='absolute inset-0 overflow-hidden rounded-xl'>{backgroundImage}</div>}
          {withImageOverlay && (
            <div
              className='absolute inset-0'
              style={{ background: 'linear-gradient(180deg, #182641 0%, rgba(24, 38, 65, 0.00) 100%)' }}
            />
          )}
          {onClose && (
            <Dialog.Close
              className={cn(
                'absolute top-4 right-4 z-20 aspect-square h-8 w-8 rounded p-1',
                'text-lemon-yellow/80 hover:bg-lemon-yellow/10 hover:text-lemon-yellow',
                'text-[22px] transition-colors md:text-base'
              )}
              aria-label='Close'
            >
              <CloseIcon />
            </Dialog.Close>
          )}
          {title ? (
            <div className='flex-shrink-0'>
              <Dialog.Title className='text-lemon-yellow relative z-10 mb-2 text-center text-base font-bold md:text-[22px]'>
                {title}
              </Dialog.Title>
            </div>
          ) : (
            <VisuallyHidden>
              <Dialog.Title>Title</Dialog.Title>
            </VisuallyHidden>
          )}
          <div className='min-h-0 flex-1 overflow-y-auto'>
            <div className='relative z-10'>
              {description && <p className='text-lavander mb-4 text-center text-sm'>{description}</p>}
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
