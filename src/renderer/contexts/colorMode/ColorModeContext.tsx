import { createTheme, ThemeProvider } from '@mui/material';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IColorModeContext {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<IColorModeContext>({
  toggleColorMode: () => {},
});

interface IColorModeProviderProps {
  children: ReactNode;
}

const ColorModeProvider: FC<IColorModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const useColorMode = () => useContext(ColorModeContext);

export { ColorModeProvider, useColorMode };
