/* eslint-disable react/prop-types */
import { createContext } from 'react';
import Directory from '../Directory';

interface IDirectoryProps {
  dir: Directory;
  refresh(): void;
}

const DirectoryContext = createContext<IDirectoryProps>({
  dir: new Directory(''),
  refresh: () => {},
});

export default DirectoryContext;

export { IDirectoryProps };
