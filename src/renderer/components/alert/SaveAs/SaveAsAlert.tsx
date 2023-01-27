import { Button, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import File from 'renderer/contexts/directory/fs/File';
import { useInAlert } from 'renderer/components/alert/InAlertContext';
import { usePath } from 'renderer/contexts/path/PathContext';

interface SaveAsAlertProps {
  file: File;
}

const SaveAsAlert: FC<SaveAsAlertProps> = ({ file }) => {
  const [customPath, setCustomPath] = useState(
    file.path !== 'undefined' ? file.path : ''
  );

  const { currentAlert } = useInAlert();

  const { path } = usePath();

  return (
    <Grid
      container
      direction="column"
      sx={{
        width: '100%',
        margin: currentAlert?.modal ? 4 : '0',
        justifyContent: currentAlert?.modal ? 'center' : 'flex-start',
        alignItems: currentAlert?.modal ? 'center' : 'flex-start',
        '&>*': {
          justifyContent: currentAlert?.modal ? 'center' : 'flex-start',
          alignItems: currentAlert?.modal ? 'center' : 'flex-start',
          mt: currentAlert?.modal ? 2 : 0,
        },
      }}
    >
      <Grid>
        <Typography>Save as</Typography>
      </Grid>
      <Grid
        container
        direction={currentAlert?.modal ? 'column' : 'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <TextField
          label="Path"
          value={customPath}
          onChange={(e) => setCustomPath(e.target.value)}
        />
        <Grid
          container
          sx={{
            mt: currentAlert?.modal ? 2 : 0,
          }}
          spacing={currentAlert?.modal ? 2 : 0}
        >
          <Grid
            sx={{
              ml: 'auto',
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                file.saveAs(`${path}/${customPath}`);
                currentAlert?.close?.();
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
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SaveAsAlert;
