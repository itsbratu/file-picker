import { Box, BoxProps, Modal, Typography, styled } from '@mui/material';

export type ModalWrapperProps = Omit<BoxProps, 'maxWidth'> & {
  $maxWidth: string | number;
  $bgColor?: string;
  $rounded?: 'none' | 'medium' | 'large';
};

type ActionsWrapperProps = BoxProps & {
  $centerActions?: boolean;
};

export const MuiModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContentStyled = styled(Box)<ModalWrapperProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 720px;
  min-width: 270px;
  max-height: 98vh;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
`;

export const TitleStyled = styled(Typography)`
  font-weight: 700;
  line-height: 133.4%;
  margin-bottom: 3px;
  flex-shrink: 0;
`;

export const ActionsWrapperStyled = styled(Box)<ActionsWrapperProps>`
  display: flex;
  justify-content: ${({ $centerActions }) =>
    $centerActions ? `center` : 'end'};
  width: 100%;
  align-self: flex-end;
  margin-top: 30px;
  flex-shrink: 0;

  & > div:last-of-type {
    margin-left: 2px;
  }
`;
export const ModalOverflowStyled = styled('div')`
  overflow: auto;
  flex-grow: 1;
`;

export const TitleWrapperStyled = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
`;
