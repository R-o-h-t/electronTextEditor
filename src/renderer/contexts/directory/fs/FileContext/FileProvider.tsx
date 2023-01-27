import { FC, ReactNode, useState } from 'react';
import DraggableDialog from 'renderer/components/draggableDialog/DraggableDialog';
import TabFileEditor from 'renderer/components/fileEditor/TabFilesEditor';
import File from '../File';
import FileContext from './FileContext';

interface IFileProviderProps {
  children: ReactNode;
}

const FileProvider: FC<IFileProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const selectFile = (file?: File) => {
    if (file) {
      setSelectedFile(file);
      return file;
    }
    return selectedFile;
  };

  const openFile = (file: File | string) => {
    const f = typeof file === 'string' ? new File(file) : file;
    if (!files.includes(f)) {
      setFiles([...files, f]);
    }
    selectFile(f);
  };

  const closeFile = (f: File | string) => {
    if (typeof f === 'string') {
      setFiles((prev) => prev.filter((file) => file.path !== f));
    } else {
      setFiles((prev) => prev.filter((file) => file.path !== f.path));
    }
  };

  return (
    <FileContext.Provider
      value={{ files, openFile, closeFile, selectFile, selectedFile }}
    >
      <DraggableDialog open={!!files.length} scroll="paper" fullWidth>
        {files.length && <TabFileEditor />}
      </DraggableDialog>
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;

export { IFileProviderProps };
