import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ErrorBoundary } from 'react-error-boundary';
// eslint-disable-next-line import/no-named-as-default
import Alert from 'renderer/components/alert/Alert';
import { IAlert } from './IAlertContext';

interface IAlertContext {
  alert: (alert: IAlert) => void;
}

const AlertContext = createContext<IAlertContext>({
  alert: () => {},
});

interface IAlertProviderProps {
  children: ReactNode;
  maxAlerts?: number;
  override?: boolean;
}

const AlertProvider: FC<IAlertProviderProps> = ({
  children,
  maxAlerts = 3,
  override = false,
}) => {
  const [alerts, setAlerts] = useState<{ [key: string]: IAlert }>({});
  const onClose = (id: string) => {
    setAlerts((old) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { [id]: _, ...rest } = old;
      return rest;
    });
  };

  const onAlert = (alert: IAlert) => {
    const id = Math.random().toString(36).slice(2, 9);
    setAlerts((old) => ({
      ...old,
      [id]: {
        ...alert,
        close: () => {
          alert.close?.();
          onClose(id);
        },
      },
    }));
  };

  return (
    <AlertContext.Provider value={{ alert: onAlert }}>
      <ErrorBoundary
        fallbackRender={() => (
          <div>
            <Typography variant="h4" color="error">
              Error
            </Typography>
          </div>
        )}
        onError={(error: Error) => {
          onAlert({
            content: (
              <Grid container spacing={1}>
                <Grid xs={12}>
                  <Typography variant="h6">{error.name}</Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>{error.message}</Typography>
                </Grid>
              </Grid>
            ),
            severity: 'error',
          });
        }}
      >
        {children}
      </ErrorBoundary>
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          left: 10,
          zIndex: 9999,
        }}
      >
        {override
          ? Object.entries(alerts)
              .slice(-maxAlerts)
              .map(([id, alert]) => (
                <Grid key={id}>
                  <Alert alert={alert} />
                </Grid>
              ))
          : Object.entries(alerts)
              .slice(0, maxAlerts)
              .map(([id, alert]) => (
                <Grid key={id}>
                  <Alert alert={alert} />
                </Grid>
              ))}
      </Grid>
    </AlertContext.Provider>
  );
};

AlertProvider.defaultProps = {
  maxAlerts: 3,
  override: false,
};

const useAlert = () => useContext(AlertContext);

export { AlertProvider, useAlert };
