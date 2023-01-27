import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Fade, Typography, useTheme } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { FC, useState } from 'react';
import Directory from 'renderer/contexts/directory/fs/Directory';
import File from 'renderer/contexts/directory/fs/File';
import { FileComponent } from '../File';

interface IDirectoryProps {
  file: File;
  child?: number;
}

const DirectoryComponent: FC<IDirectoryProps> = ({ file, child = 0 }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  if (Directory.isDirectory(file)) {
    const dir = file as Directory;

    const handleClick = () => {
      if (dir.isOpen) dir.close();
      else dir.open();
      setOpen(dir.isOpen);
    };

    return (
      <Grid
        container
        direction="column"
        sx={{
          width: '100%',
        }}
      >
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
            paddingLeft: child,
          }}
          wrap="nowrap"
          onClick={handleClick}
        >
          <Grid
            xs
            sx={{
              mx: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {dir.isOpen ? (
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            ) : (
              <KeyboardArrowRightIcon
                fontSize="small"
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            )}
          </Grid>
          <Grid
            xs={2}
            sx={{
              mx: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {dir.isOpen ? (
              <FolderOpenIcon
                fontSize="small"
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            ) : (
              <FolderIcon
                fontSize="small"
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            )}
          </Grid>
          <Grid xs={10}>
            <Typography fontSize="medium" color={theme.palette.text.primary}>
              {dir.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          sx={{
            position: 'relative',
          }}
        >
          <Fade
            in={dir.isOpen}
            timeout={500}
            style={
              dir.isOpen
                ? {}
                : {
                    height: 0,
                    width: 0,
                    overflow: 'hidden',
                  }
            }
          >
            <Grid
              container
              direction="column"
              sx={{
                '&::before': {
                  content: '""',
                  width: '1px',
                  height: '100%',
                  backgroundColor: '#A0A0A030',
                  position: 'absolute',
                  left: `${(child + 1) * 7.5}px`,
                  top: '0px',
                },
              }}
            >
              {dir.children.map((cFile) => {
                return (
                  <Grid key={cFile.path}>
                    <DirectoryComponent child={child + 1} file={cFile} />
                  </Grid>
                );
              })}
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    );
  }

  return <FileComponent child={child} $file={file} />;
};

DirectoryComponent.defaultProps = {
  child: 0,
};

export default DirectoryComponent;
