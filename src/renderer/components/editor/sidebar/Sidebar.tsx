/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { editorStateToJSON } from 'megadraft';
import { FC, useState } from 'react';
import File from '../../../contexts/directory/fs/File';

interface ISidebarProps {
  plugins: any[];
  editorState: any;
  file?: File;
  alwaysVisible?: boolean;
  direction?: 'row' | 'column';
}

const Sidebar: FC<ISidebarProps> = ({
  editorState,
  file,
  alwaysVisible,
  direction = 'row',
}) => {
  const [open, setOpen] = useState(alwaysVisible);

  const theme = useTheme();

  const handleClick = () => {
    if (alwaysVisible) return;
    setOpen(!open);
  };

  const handleClickButton = (button?: string) => () => {
    const onSave = () => {
      const newContent = editorStateToJSON(editorState);
      if (file) {
        file.content = newContent;
      }
    };
    const onCopy = () => {
      const content = editorState.getCurrentContent().getPlainText('\u0001');
      navigator.clipboard.writeText(content);
    };

    switch (button) {
      case 'save':
        onSave();
        break;
      case 'copy':
        onCopy();
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('Not implemented');
        break;
    }
  };

  return (
    <Grid container direction={direction}>
      {!alwaysVisible && (
        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: theme.palette.background.paper,
            filter: 'drop-shadow(0px 0px 2px rgba(0 0 0 / 0.4))',
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          <IconButton onClick={handleClick}>
            {open ? <CloseIcon /> : <AddIcon />}
          </IconButton>
        </Box>
      )}
      {open && (
        <Grid container direction={direction}>
          <Grid>
            <IconButton onClick={handleClickButton('save')}>
              <SaveIcon />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton onClick={handleClickButton('copy')}>
              <ContentCopyIcon />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton onClick={handleClickButton()}>
              <DescriptionIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

Sidebar.defaultProps = {
  file: undefined,
  alwaysVisible: false,
  direction: 'row',
};

export default Sidebar;
