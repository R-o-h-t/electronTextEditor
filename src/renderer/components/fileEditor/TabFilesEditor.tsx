import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogContent, DialogTitle } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import Editor from 'renderer/components/editor/Editor';
import { useAlert } from 'renderer/contexts/alert/AlertContext';
import File from 'renderer/contexts/directory/fs/File';
import useFile from 'renderer/contexts/directory/fs/FileContext/useFile';
import ShouldSaveAlert from '../alert/ShouldSave/ShouldSaveAlert';
import { useInDraggableDialog } from '../draggableDialog/InDraggableDialogContext';
import FileTabHeader from './TabFileHeader';

const TabFileEditor: FC = () => {
  const { alert } = useAlert();

  const { maximized, setMaximized } = useInDraggableDialog();

  const { files, closeFile, selectedFile, selectFile } = useFile();

  if (!files.length) throw new Error('No file to edit');

  const handleClose = (file: File, force?: boolean) => {
    if (!file.isToDate() && !force) {
      selectFile(file);
      alert({
        duration: 0,
        severity: 'warning',
        content: <ShouldSaveAlert file={file} />,
        close: () => handleClose(file, true),
      });
      return false;
    }
    closeFile(file);
    return true;
  };

  const handleCloseAll = () => {
    return files.every((file) => handleClose(file));
  };

  return (
    <>
      <DialogTitle
        sx={{
          padding: 0,
          height: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
        style={{ cursor: 'move' }}
        id="draggable-dialog-title"
        onDoubleClick={() => setMaximized(!maximized)}
      >
        <CloseIcon
          onClick={() => handleCloseAll()}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: 'white',
            cursor: 'pointer',
          }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          height: '300px',
          padding: 0,
        }}
      >
        {selectedFile ? (
          <>
            <Grid
              container
              sx={{
                width: '100%',
                height: 40,
                alignItems: 'center',
                '& > *': {},
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                // do not wrap on a new line
                // flexWrap: 'nowrap',
                overflowY: 'hidden',
                overflowX: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                flexDirection: 'row',
                flexWrap: 'nowrap',
                flex: '0 0 auto',
              }}
            >
              {files.map((file) => (
                <FileTabHeader
                  close={() => handleClose(file)}
                  open={() => selectFile(file)}
                  selected={selectedFile.path === file.path}
                  file={file}
                />
              ))}
            </Grid>
            <Box
              sx={{
                padding: 1,
              }}
            >
              <Editor file={selectedFile} />
            </Box>
          </>
        ) : (
          <></>
        )}
      </DialogContent>
    </>
  );
};

export default TabFileEditor;
