import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import { useDirectory } from 'renderer/contexts/directory/fs/DirectoryContext';

const CollapseFileTree: FC = () => {
  const { dir } = useDirectory();
  return (
    <IconButton onClick={dir.collapse}>
      <UnfoldLessDoubleIcon />
    </IconButton>
  );
};

export default CollapseFileTree;
