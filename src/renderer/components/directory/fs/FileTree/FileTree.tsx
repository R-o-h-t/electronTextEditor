/* eslint-disable react/require-default-props */
import Grid from '@mui/system/Unstable_Grid';
import * as React from 'react';
import { FC } from 'react';
import { useDirectory } from 'renderer/contexts/directory/fs/DirectoryContext';

import { useContextMenu } from 'renderer/contexts/menu/ContextMenuContext';
import { DirectoryComponent } from '../Directory';
import DirectoryContextMenu from '../Directory/DirectoryContextMenu';

const FileTree: FC = () => {
  const { dir } = useDirectory();

  const { openContextMenu } = useContextMenu();

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    openContextMenu({
      content: <DirectoryContextMenu />,
      onClose: () => {},
    })(e);
  };

  return (
    <Grid
      container
      direction="column"
      onContextMenu={handleContextMenu}
      sx={{
        height: '100%',
      }}
    >
      {dir.children.map((child) => {
        return <DirectoryComponent file={child} key={child.path} />;
      })}
    </Grid>
  );
};

export default FileTree;
