import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';

const Setting: FC = () => {
  return (
    <Box>
      <Grid container>
        <Grid>
          <Typography>Settings</Typography>
        </Grid>
        <Grid container>.</Grid>
      </Grid>
    </Box>
  );
};

export default Setting;
