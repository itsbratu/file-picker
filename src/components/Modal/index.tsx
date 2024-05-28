import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  ModalProps as MuiModalProps,
} from '@mui/material';
import { ReactNode, forwardRef } from 'react';
import {
  ActionsWrapperStyled,
  ModalContentStyled,
  ModalOverflowStyled,
  ModalWrapperProps,
  MuiModalStyled,
  TitleStyled,
  TitleWrapperStyled,
} from './styles';
import { XCircleIcon } from 'lucide-react';

export type ModalProps = Omit<MuiModalProps, 'open' | 'title' | 'onClose'> & {
  isOpen: boolean;
  title?: ReactNode;
  maxWidth?: string | number;
  children?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  confirmButtonProps?: ButtonProps;
  onCancel?: () => void;
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  actionsNoWrap?: boolean;
  centerActions?: boolean;
  bgColor?: string;
  rounded?: ModalWrapperProps['$rounded'];
  showCloseIcon?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      maxWidth = 600,
      children,
      actions,
      onConfirm,
      confirmText,
      confirmButtonProps,
      onCancel,
      cancelText,
      cancelButtonProps,
      actionsNoWrap,
      centerActions = false,
      bgColor,
      rounded = 'medium',
      showCloseIcon = false,
      disableBackdropClick = false,
      disableEscapeKeyDown = false,
    },
    forwardedRef
  ): JSX.Element => {
    const renderActions = () => {
      if (actions) return actions;

      const hasOneButton = !confirmText || !cancelText;
      const singleWidth = 163;
      const doubleWidth = 127;
      const width = actionsNoWrap
        ? 'auto'
        : hasOneButton
        ? singleWidth
        : doubleWidth;

      return cancelText || confirmText ? (
        <ActionsWrapperStyled $centerActions={centerActions}>
          {cancelText && (
            <Box width={width}>
              <Button
                size="large"
                onClick={onCancel ?? onClose}
                fullWidth
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
            </Box>
          )}
          {confirmText && (
            <Box width={width}>
              <Button
                size="large"
                onClick={onConfirm}
                fullWidth
                {...confirmButtonProps}
              >
                {confirmText}
              </Button>
            </Box>
          )}
        </ActionsWrapperStyled>
      ) : null;
    };

    const renderCloseIcon = showCloseIcon && (
      <IconButton edge="end" aria-label="delete" size="large" onClick={onClose}>
        <XCircleIcon size={20} />
      </IconButton>
    );

    const handleClose = (
      _: unknown,
      reason: 'backdropClick' | 'escapeKeyDown'
    ) => {
      if (
        (reason === 'backdropClick' && disableBackdropClick) ||
        (reason === 'escapeKeyDown' && disableEscapeKeyDown)
      )
        return;

      onClose?.();
    };

    return (
      <MuiModalStyled open={isOpen} onClose={handleClose} ref={forwardedRef}>
        <ModalContentStyled
          $maxWidth={maxWidth}
          $bgColor={bgColor ?? '#d3d3d3'}
          $rounded={rounded}
        >
          {title ? (
            <TitleWrapperStyled>
              <TitleStyled variant="h5">{title}</TitleStyled>
              {renderCloseIcon}
            </TitleWrapperStyled>
          ) : null}
          <ModalOverflowStyled>{children}</ModalOverflowStyled>
          {renderActions()}
        </ModalContentStyled>
      </MuiModalStyled>
    );
  }
);
Modal.displayName = 'ModalComponent';
