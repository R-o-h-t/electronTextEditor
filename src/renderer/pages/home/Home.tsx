import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import 'megadraft/dist/css/megadraft.css';
import { FC } from 'react';
import { useAlert } from 'renderer/contexts/alert/AlertContext';
import File from 'renderer/contexts/directory/fs/File';
import { useFile } from 'renderer/contexts/directory/fs/FileContext';

const Home: FC = () => {
  const { alert } = useAlert();

  const { openFile } = useFile();

  const handleClick = () => {
    openFile(new File());
  };

  return (
    <Grid
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 2,
      }}
      container
    >
      <Grid container xs direction="column">
        <Grid>
          <Typography variant="h2">TESXT</Typography>
        </Grid>
        <Grid>
          <Typography variant="body1">some text</Typography>
        </Grid>
        <Grid>
          <Typography variant="body2">some more text</Typography>
        </Grid>
      </Grid>
      <Grid container xs direction="column">
        <Grid
          sx={{
            mt: 10,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            New File
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
