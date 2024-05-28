import { IconButton } from '@mui/material';
import {
  UploadedFileContentStyled,
  UploadedFileDetailsStyled,
  UploadedFileNameStyled,
  UploadedFileWrapperStyled,
} from './styles';
import { StickyNoteIcon, XCircleIcon } from 'lucide-react';

type UploadedFileProps = {
  file: File;
  onRemoveFile: () => void;
};

export const UploadedFile = ({
  file,
  onRemoveFile,
}: UploadedFileProps): JSX.Element => {
  return (
    <UploadedFileWrapperStyled>
      <UploadedFileContentStyled>
        <UploadedFileDetailsStyled>
          <StickyNoteIcon size={30} />

          <UploadedFileNameStyled>{file.name}</UploadedFileNameStyled>
        </UploadedFileDetailsStyled>

        <IconButton onClick={onRemoveFile}>
          <XCircleIcon size={20} />
        </IconButton>
      </UploadedFileContentStyled>
    </UploadedFileWrapperStyled>
  );
};
UploadedFile.displayName = 'UploadedFileComponent';
