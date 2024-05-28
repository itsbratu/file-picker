import { useState } from 'react';
import { FilePickerDialog } from '../FilePickerDialog';
import { UploadIconStyled, WrapperStyled } from './styles';
import { Snackbar, SnackbarContent } from '@mui/material';
import { EXCEL_FORMAT, TXT_FORMAT } from '../../constants';

export const Container = (): JSX.Element => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <WrapperStyled>
        <UploadIconStyled
          sx={{ marginRight: '30px' }}
          color="#08568b"
          size={100}
          onClick={() => setIsOpen(!isOpen)}
        />
        <FilePickerDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          title={'Upload Files'}
          onUploadButtonClick={() => setIsSnackbarOpen(!isSnackbarOpen)}
          subtitle={''}
          suportedFileFormats={[EXCEL_FORMAT, TXT_FORMAT]}
        />
      </WrapperStyled>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(!isSnackbarOpen)}
      >
        <SnackbarContent
          style={{
            backgroundColor: 'teal',
          }}
          message={
            <span id="client-snackbar">
              File(s) successfully processed! Unsupported file types were
              omitted!
            </span>
          }
        />
      </Snackbar>
    </>
  );
};
Container.displayName = 'ContainerComponent';
