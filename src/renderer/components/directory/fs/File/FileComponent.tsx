import DescriptionIcon from '@mui/icons-material/Description';
import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { FC } from 'react';
import File from 'renderer/contexts/directory/fs/File';
import { useFile } from 'renderer/contexts/directory/fs/FileContext';

interface IFileProps {
  $file: File;
  child?: number;
}

const FileComponent: FC<IFileProps> = ({ $file, child = 0 }) => {
  const theme = useTheme();
  const { files, openFile } = useFile();

  const handleClick = () => {
    if (!files.some((file) => file.path === $file.path)) openFile($file);
  };

  return (
    <Grid
      container
      sx={{
        height: '30px',
        alignItems: 'center',
        width: '100%',
        mt: '2px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#e0e0e010',
        },
        paddingLeft: child + 1,
      }}
      onClick={handleClick}
      wrap="nowrap"
    >
      <Grid
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 3,
        }}
      >
        <DescriptionIcon
          fontSize="small"
          sx={{
            color: files.some((file) => file.path === $file.path)
              ? theme.palette.text.disabled
              : theme.palette.text.primary,
          }}
        />
      </Grid>
      <Grid
        xs={10}
        sx={{
          pl: 2,
        }}
      >
        <Typography fontSize="medium" color={theme.palette.text.primary}>
          {$file.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

FileComponent.defaultProps = {
  child: 0,
};

export default FileComponent;
