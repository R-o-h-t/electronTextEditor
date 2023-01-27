/* eslint-disable react/require-default-props */
import MenuItem from '@mui/material/MenuItem';
import { FC } from 'react';

interface IContextMenuProps {
  onClose?: () => void;
}

const DirectoryContextMenu: FC<IContextMenuProps> = ({ onClose }) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      <MenuItem onClick={handleClose}>Copy</MenuItem>
      <MenuItem onClick={handleClose}>Print</MenuItem>
      <MenuItem onClick={handleClose}>Highlight</MenuItem>
      <MenuItem onClick={handleClose}>Email</MenuItem>
    </>
  );
};

export default DirectoryContextMenu;
