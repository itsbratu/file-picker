import { Box, Button, Card, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { UploadedFile } from '../UploadedFile';
import { FilePicker } from '../FilePicker';
import { DialogActionButtonsStyled } from './styles';
import { Modal } from '../Modal';

type FilePickerDialogProps = {
  isOpen: boolean;
  title: string;
  subtitle: string;
  suportedFileFormats?: string[];
  onClose: () => void;
  onUploadButtonClick: (file: File[]) => void;
};

export const FilePickerDialog = ({
  isOpen,
  title,
  subtitle,
  suportedFileFormats,
  onClose,
  onUploadButtonClick,
}: FilePickerDialogProps) => {
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  const handleClose = () => {
    setFiles(undefined);

    onClose();
  };

  const handleUpload = (uploadFiles: File[]) => {
    setFiles(uploadFiles.length ? uploadFiles : undefined);
  };

  const handleUploadButtonClick = () => {
    if (!files) {
      return;
    }

    onUploadButtonClick(files);
    handleClose();
  };

  const handleRemoveFile = (name: string) => {
    setFiles(
      files?.filter((file) => file.name !== name).length
        ? files?.filter((file) => file.name !== name)
        : undefined
    );
  };

  const renderDialogHeader = (
    <>
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body1">{subtitle}</Typography>
    </>
  );

  const renderDialogContent = (
    <>
      {files ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {files.map((file) => (
            <UploadedFile
              file={file}
              onRemoveFile={() => handleRemoveFile(file.name)}
            />
          ))}
        </Box>
      ) : (
        <FilePicker
          uploadText={'Drag and drop a file or Browse Files'}
          onUpload={handleUpload}
          fileFormats={suportedFileFormats}
        />
      )}
    </>
  );

  const renderDialogButtons = (
    <DialogActionButtonsStyled>
      <Button
        size="medium"
        onClick={handleClose}
        variant="outlined"
        sx={{ textTransform: 'capitalize' }}
      >
        Cancel
      </Button>

      <Button
        size="medium"
        onClick={handleUploadButtonClick}
        variant="contained"
        sx={{ textTransform: 'capitalize' }}
      >
        Upload
      </Button>
    </DialogActionButtonsStyled>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} maxWidth={750}>
        <Card>
          {renderDialogHeader}
          {renderDialogContent}
          {renderDialogButtons}
        </Card>
      </Modal>
    </>
  );
};
