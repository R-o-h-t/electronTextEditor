import CloseIcon from '@mui/icons-material/Close';
import {
  Alert as MUIAlert,
  Collapse,
  Dialog,
  DialogProps,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC, useEffect, useState } from 'react';
import { IAlert } from 'renderer/contexts/alert/IAlertContext';
import { InAlertProvider } from 'renderer/components/alert/InAlertContext';

interface IAlertProps {
  alert: IAlert;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  dialogProps?: DialogProps;
}

const Alert: FC<IAlertProps> = ({ alert }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    if (alert.duration !== 0) {
      const timeout = setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          alert.close?.();
        }, 500);
      }, alert.duration || 3000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [alert]);

  return (
    <Collapse in={open}>
      <MUIAlert
        severity={alert?.severity}
        sx={{
          '&.MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Grid
          container
          sx={{
            color: alert?.severity,
            width: '100%',
            position: 'relative',
          }}
        >
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={alert.close}
            sx={{
              position: 'absolute',
              right: 2,
              top: 2,
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <InAlertProvider currentAlert={alert}>
            {alert?.content}
          </InAlertProvider>
        </Grid>
      </MUIAlert>
    </Collapse>
  );
};

const ModalAlert: FC<IAlertProps> = ({ alert, dialogProps }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    if (alert.duration !== 0) {
      const timeout = setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          alert.close?.();
        }, 500);
      }, alert.duration || 3000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [alert]);

  return (
    <Dialog
      open={open}
      onClose={alert.close}
      container={() => document.getElementById('modalAlert-dialog-container')}
      style={{ position: 'absolute' }}
      BackdropProps={{ style: { position: 'absolute' } }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dialogProps}
    >
      <Grid
        container
        sx={{
          color: alert?.severity,
          width: '100%',
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={alert.close}
          sx={{
            position: 'absolute',
            right: 2,
            top: 2,
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <InAlertProvider currentAlert={alert}>{alert?.content}</InAlertProvider>
      </Grid>
    </Dialog>
  );
};

export { Alert, ModalAlert };

const AlertWrapper: FC<IAlertProps> = ({ alert }) => {
  return alert.modal ? <ModalAlert alert={alert} /> : <Alert alert={alert} />;
};

export default AlertWrapper;
