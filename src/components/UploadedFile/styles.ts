import { Box } from '@mui/material';
import styled from 'styled-components';

export const UploadedFileContentStyled = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background: #f2f8fe;
  padding: 3px 4px;
`;

export const UploadedFileDetailsStyled = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 64px;
  align-items: center;
`;

export const UploadedFileWrapperStyled = styled(Box)`
  padding: 3px 0 3px;
  border-radius: 8px;
`;

export const UploadedFileNameStyled = styled(`p`)`
  margin-left: 5px;
  font-size: 16px;
`;
