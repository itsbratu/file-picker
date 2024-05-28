import { Box, BoxProps, IconButton, Typography, styled } from '@mui/material';

type FilePickerContentStyledProps = BoxProps & {
  $isDragActive: boolean;
};

export const FilePickerWrapperStyled = styled(Box)`
  background-color: white;
  padding: 3px 0 3px;
  border-radius: 8px;
`;

export const FilePickerContentStyled = styled(
  Box
)<FilePickerContentStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px dashed
    ${({ $isDragActive }) => ($isDragActive ? 'blue' : '#08568B')};
  border-radius: 8px;
  padding: 3px 4px;
  background: #f2f8fe;
`;

export const FilePickerTitleStyled = styled(Typography)`
  padding-bottom: 1px;
  font-weight: 500;
`;

export const FilePickerSubTitleStyled = styled(Typography)`
  padding-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
`;

export const FilePickerActionAreaStyled = styled(IconButton)`
  display: flex;
  flex-direction: column;
  padding: 0;
  &:hover {
    background-color: transparent;
  }
`;

export const FilePickerInputStyled = styled('input')`
  // All CSS Resets for safely keeping this element only for screen readers
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
