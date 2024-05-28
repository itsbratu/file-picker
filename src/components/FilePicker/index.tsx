import { Box, Typography } from '@mui/material';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import {
  FilePickerActionAreaStyled,
  FilePickerContentStyled,
  FilePickerInputStyled,
  FilePickerSubTitleStyled,
  FilePickerTitleStyled,
  FilePickerWrapperStyled,
} from './styles';
import { UploadCloudIcon } from 'lucide-react';
import {
  EXCEL_FORMAT,
  PDF_FORMAT,
  TXT_FORMAT,
  WORD_FORMAT,
} from '../../constants';

type FilePickerProps = {
  /** Internally used to identify file picker input component */
  id?: string;
  /** Explanatory text to be rendered  */
  title?: string;
  /** Additional explanatory text to be rendered under the title */
  subTitle?: string;
  /** Label for the upload action button */
  uploadText?: string;
  /**
   * String containing all possible file MIME types that are accepted
   * @default application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   */
  fileFormats?: string[];
  /** Callback function fired when upload action button was pressed or file was dropped on the dropzone. */
  onUpload: (file: File[]) => void;
  /** Callback function fired when the file MIME type validation failed */
  onValidationError?: (file: File) => void;
};

const DEFAULT_UPLOAD_INPUT_ID = 'file-upload-picker';
const DEFAULT_FILE_FORMATS = [
  EXCEL_FORMAT,
  WORD_FORMAT,
  PDF_FORMAT,
  TXT_FORMAT,
];

/**
 * @component
 *
 * File Pickers allows users to quickly select a locally stored file by either clicking on a button
 * or dropping the file on a predefined dropzone.
 *
 * TODO: Move component to cc-shared
 */
export const FilePicker = ({
  id = DEFAULT_UPLOAD_INPUT_ID,
  title,
  subTitle,
  uploadText,
  fileFormats = DEFAULT_FILE_FORMATS,
  onUpload,
  onValidationError,
}: FilePickerProps): JSX.Element => {
  const [isDragActive, setDragActive] = useState(false);
  const inputPickerRef = useRef<HTMLInputElement>(null);

  const subtitleText = `(${fileFormats.includes(EXCEL_FORMAT) ? '.xcel' : ''} ${
    fileFormats.includes(WORD_FORMAT) ? ', .docx' : ''
  }
  ${fileFormats.includes(PDF_FORMAT) ? ', .pdf' : ''}
  ${fileFormats.includes(TXT_FORMAT) ? ', .txt' : ''})
  `;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;

    if (files) {
      const acceptedFiles = Array.from(files).filter((file) =>
        fileFormats.includes(file.type)
      );
      onUpload(acceptedFiles);
    }
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files) {
      const acceptedFiles = Array.from(files).filter((file) =>
        fileFormats.includes(file.type)
      );
      onUpload(acceptedFiles);
    }
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === 'dragenter' || event.type === 'dragover');
  };

  const handleButtonClick = () => inputPickerRef.current?.click();

  return (
    <FilePickerWrapperStyled
      onDrop={handleFileDrop}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
    >
      <FilePickerContentStyled
        $isDragActive={isDragActive}
        sx={{ marginTop: '15px' }}
      >
        {title && (
          <Box>
            <FilePickerTitleStyled variant="subtitle1">
              {title}
            </FilePickerTitleStyled>
          </Box>
        )}

        <FilePickerActionAreaStyled
          onClick={handleButtonClick}
          disabled={isDragActive}
        >
          <UploadCloudIcon size={40} color="#08568b" />
          <Typography>{uploadText}</Typography>
          <Typography sx={{ fontSize: '12px' }}>{subtitleText}</Typography>
        </FilePickerActionAreaStyled>

        <FilePickerInputStyled
          type="file"
          ref={inputPickerRef}
          id={id}
          name={id}
          accept={fileFormats.join()}
          multiple
          onChange={handleFileChange}
        />
      </FilePickerContentStyled>
    </FilePickerWrapperStyled>
  );
};
FilePicker.displayName = 'FilePickerComponent';
