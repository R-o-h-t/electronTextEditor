import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import { useDirectory } from 'renderer/contexts/directory/fs/DirectoryContext';

const RefreshFileTree: FC = () => {
  const { refresh } = useDirectory();
  return (
    <IconButton onClick={refresh}>
      <RefreshIcon />
    </IconButton>
  );
};

export default RefreshFileTree;
