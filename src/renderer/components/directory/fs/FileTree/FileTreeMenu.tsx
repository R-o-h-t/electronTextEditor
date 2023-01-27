import Grid from '@mui/system/Unstable_Grid';
import * as React from 'react';
import { FC } from 'react';
import { DirectoryProvider } from 'renderer/contexts/directory/fs/DirectoryContext';

import { usePath } from 'renderer/contexts/path/PathContext';
import FileTree from './FileTree';
import RefreshFileTree from './RefreshFileTree';
import CollapseFileTree from './CollapseFileTree';

interface IFileTreeMenuProps {
  // eslint-disable-next-line react/require-default-props
  dir?: string;
}

const FileTreeMenu: FC<IFileTreeMenuProps> = ({ dir }) => {
  const { path } = usePath();

  const [$path] = React.useState(dir || path);

  return (
    <DirectoryProvider path={$path}>
      <Grid
        container
        direction="column"
        sx={{
          width: '100%',
          height: '100%',
        }}
        wrap="nowrap"
      >
        <Grid
          container
          sx={{
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Grid
            sx={{
              mr: 1,
            }}
          >
            <CollapseFileTree />
          </Grid>
          <Grid
            sx={{
              mr: 1,
            }}
          >
            <RefreshFileTree />
          </Grid>
        </Grid>
        <Grid
          sx={{
            width: '100%',
            overflow: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
              width: '2px',
              height: '4px',
            },

            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#303010',
              borderRadius: '4px',
            },
          }}
        >
          <FileTree />
        </Grid>
      </Grid>
    </DirectoryProvider>
  );
};

export default FileTreeMenu;
