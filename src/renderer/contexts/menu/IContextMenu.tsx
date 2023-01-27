import { ReactNode } from 'react';

export interface IContextMenu {
  content?: ReactNode;
  onClose?: () => void;
}
