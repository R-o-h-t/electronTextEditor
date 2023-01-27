/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Paper, { PaperProps } from '@mui/material/Paper';
import React from 'react';
import Draggable from 'react-draggable';
import { AlertProvider } from 'renderer/contexts/alert/AlertContext';
import { InDraggableDialogProvider } from './InDraggableDialogContext';

function PaperComponent(props: PaperProps) {
  const [maximized, setMaximized] = React.useState(false);

  const handleMaximize = (state: boolean) => {
    setMaximized(state);
  };

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel='[class*="MuiDialogContent-root"]'
      bounds="parent"
      disabled={maximized}
    >
      <Paper
        {...props}
        sx={
          maximized
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                margin: 0,
                borderRadius: 0,
              }
            : {}
        }
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <AlertProvider maxAlerts={1}>
            <InDraggableDialogProvider
              maximized={maximized}
              setMaximized={handleMaximize}
            >
              {props.children}
            </InDraggableDialogProvider>
          </AlertProvider>
        </Box>
      </Paper>
    </Draggable>
  );
}

export default function DraggableDialog(props: DialogProps) {
  return (
    <Dialog
      style={{ position: 'absolute' }}
      BackdropProps={{ style: { position: 'absolute' } }}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={PaperComponent}
      container={() => document.getElementById('draggable-dialog-container')}
      {...props}
    />
  );
}
