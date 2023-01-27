import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import File from 'renderer/contexts/directory/fs/File';

interface IFileTabHeaderProps {
  close: () => void;
  open: () => void;
  selected: boolean;
  file: File;
}

const FileTabHeader: FC<IFileTabHeaderProps> = ({
  open,
  close,
  selected,
  file,
}) => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      sx={{
        width: 140,
        minWidth: 140,
        height: 40,
        borderTop: selected ? '2px solid #5f0102' : '',
        backgroundColor: selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        paddingInline: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        margin: 0,
        '&:hover': selected
          ? {}
          : {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            },
      }}
    >
      <Grid container onClick={open} alignItems="center" xs>
        <Grid xs>
          <DescriptionIcon />
        </Grid>
        <Grid
          xs
          sx={{
            overflow: 'hidden',
          }}
        >
          <Typography>{file.name}</Typography>
        </Grid>
      </Grid>

      <Grid xs={3}>
        <Box
          onClick={close}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            padding: 0.5,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <CloseIcon fontSize="inherit" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileTabHeader;
