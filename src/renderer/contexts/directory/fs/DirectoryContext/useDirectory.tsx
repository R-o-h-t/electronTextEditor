/* eslint-disable react/prop-types */
import { useContext } from 'react';
import DirectoryContext, { IDirectoryProps } from './DirectoryContext';

const useDirectory = (): IDirectoryProps => {
  return useContext(DirectoryContext);
};

export default useDirectory;
