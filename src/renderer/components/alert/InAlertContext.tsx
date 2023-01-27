import { createContext, FC, useContext } from 'react';
import { IAlert } from '../../contexts/alert/IAlertContext';

interface IInAlertContext {
  // eslint-disable-next-line react/require-default-props
  currentAlert?: IAlert;
}

const InAlertContext = createContext<IInAlertContext>({});

interface IInAlertProviderProps extends IInAlertContext {
  children: React.ReactNode;
}

const InAlertProvider: FC<IInAlertProviderProps> = ({
  currentAlert,
  children,
}) => {
  return (
    <InAlertContext.Provider value={{ currentAlert }}>
      {children}
    </InAlertContext.Provider>
  );
};

const useInAlert = () => {
  return useContext(InAlertContext);
};

export { InAlertProvider, useInAlert };
