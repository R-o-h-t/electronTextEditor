import { IconButton, useTheme } from '@mui/material';
import { FC } from 'react';
import { useColorMode } from 'renderer/contexts/colorMode/ColorModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeSwitch: FC = () => {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ColorModeSwitch;
