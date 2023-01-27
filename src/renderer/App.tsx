import { Box } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import ColorModeSwitch from './components/colorMode/ColorModeSwitch';
import { FileTreeMenu } from './components/directory/fs/FileTree';
import { AlertProvider } from './contexts/alert/AlertContext';
import { ColorModeProvider } from './contexts/colorMode/ColorModeContext';
import { FileProvider } from './contexts/directory/fs/FileContext';
import { ContextMenuProvider } from './contexts/menu/ContextMenuContext';
import { PathProvider } from './contexts/path/PathContext';
import { Home } from './pages';

function App() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Grid
        direction="column"
        container
        xs={3}
        wrap="nowrap"
        sx={{
          padding: 2,
          position: 'relative',
          backgroundColor: 'divider',
        }}
      >
        <Grid>
          <ColorModeSwitch />
        </Grid>
        <Grid height="100%" width="100%">
          <FileTreeMenu />
        </Grid>
      </Grid>
      <Grid
        xs
        position="relative"
        id="draggable-dialog-container"
        mx={2}
        my={2}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Grid>
    </Grid>
  );
}

export default function AppWithContexts() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <ColorModeProvider>
        <PathProvider path="./data">
          <ContextMenuProvider>
            <AlertProvider maxAlerts={4}>
              <FileProvider>
                <App />
              </FileProvider>
            </AlertProvider>
          </ContextMenuProvider>
        </PathProvider>
      </ColorModeProvider>
    </Box>
  );
}
