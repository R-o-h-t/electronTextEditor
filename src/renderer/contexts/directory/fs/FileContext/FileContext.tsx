import React from 'react';
import File from '../File';

interface IFileContextProps {
  files: File[];
  openFile(file: File | string): void;
  closeFile(file: File | string): void;
  selectFile: (file?: File) => File | null;
  selectedFile: File | null;
}

const FileContext = React.createContext<IFileContextProps>({
  files: [],
  openFile: () => {},
  closeFile: () => {},
  selectFile: () => null,
  selectedFile: null,
});

export default FileContext;

export { IFileContextProps };
