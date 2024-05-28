import { Box, styled } from '@mui/material';
import { UploadCloudIcon } from 'lucide-react';

export const WrapperStyled = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const UploadIconStyled = styled(UploadCloudIcon)`
  &:hover {
    cursor: pointer;
  }
`;
