import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import { useAlert } from 'renderer/contexts/alert/AlertContext';
import { useInAlert } from 'renderer/components/alert/InAlertContext';
import File from 'renderer/contexts/directory/fs/File';
import SaveAsAlert from '../SaveAs/SaveAsAlert';

interface ShouldSaveAlertProps {
  file: File;
}

const ShouldSaveAlert: FC<ShouldSaveAlertProps> = ({ file }) => {
  const { alert } = useAlert();

  const { currentAlert } = useInAlert();

  return (
    <Grid container>
      <Grid>
        <Typography>Do you want to save changes?</Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          ml: 'auto',
          width: 'fit-content',
        }}
      >
        <Grid>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const returnCode = file.save();
              currentAlert?.close?.();
              if (returnCode === 1)
                alert({
                  duration: 0,
                  content: <SaveAsAlert file={file} />,
                  severity: 'info',
                  modal: true,
                });
              else if (returnCode === 2)
                alert({
                  content: 'File has been modified by another program',
                  severity: 'error',
                });
            }}
          >
            Save
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              currentAlert?.close?.();
            }}
          >
            Discard
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShouldSaveAlert;
