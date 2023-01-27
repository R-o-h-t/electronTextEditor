import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import Directory from '../Directory';
import DirectoryContext from './DirectoryContext';

interface IDirectoryProviderProps {
  path: string;
  children: ReactNode;
}

const DirectoryProvider: FC<IDirectoryProviderProps> = ({ path, children }) => {
  const [dir, setDir] = useState(new Directory(path));

  const refresh = useCallback(async () => {
    const newDir = new Directory(path);
    newDir.build();
    setDir(newDir);
  }, [path]);

  useEffect(() => {
    refresh();
  }, [path, refresh]);

  return (
    <DirectoryContext.Provider value={{ dir, refresh }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryProvider;

export { IDirectoryProviderProps };
