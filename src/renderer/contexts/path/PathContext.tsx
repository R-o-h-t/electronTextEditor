import { createContext, FC, ReactNode, useContext } from 'react';

interface IPathContext {
  path: string;
}

const PathContext = createContext<IPathContext>({
  path: '',
});

interface IPathProviderProps extends IPathContext {
  children: ReactNode;
}

const PathProvider: FC<IPathProviderProps> = ({ path, children }) => {
  return (
    <PathContext.Provider value={{ path }}>{children}</PathContext.Provider>
  );
};

const usePath = (): IPathContext => {
  return useContext(PathContext);
};

export { PathProvider, usePath };
