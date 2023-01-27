import { createContext, FC, useContext } from 'react';

interface IInDraggableDialogContext {
  maximized: boolean;
  setMaximized: (maximized: boolean) => void;
}

const InDraggableDialogContext = createContext<IInDraggableDialogContext>({
  maximized: false,
  setMaximized: () => {},
});

interface IInDraggableDialogProviderProps extends IInDraggableDialogContext {
  children: React.ReactNode;
}

const InDraggableDialogProvider: FC<IInDraggableDialogProviderProps> = ({
  maximized,
  setMaximized,
  children,
}) => {
  return (
    <InDraggableDialogContext.Provider value={{ maximized, setMaximized }}>
      {children}
    </InDraggableDialogContext.Provider>
  );
};

const useInDraggableDialog = () => {
  return useContext(InDraggableDialogContext);
};

export { InDraggableDialogProvider, useInDraggableDialog };
