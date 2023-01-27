import React from 'react';
import FileContext from './FileContext';

const useFile = () => {
  const context = React.useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
};

export default useFile;
