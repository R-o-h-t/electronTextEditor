import { Menu } from '@mui/material';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { IContextMenu } from './IContextMenu';

interface IContextMenuContextProps {
  openContextMenu: (
    menu: IContextMenu
  ) => (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MenuContext = createContext<IContextMenuContextProps>({
  openContextMenu: () => () => {},
});

interface IMenuProviderProps {
  children: ReactNode;
}

const ContextMenuProvider: FC<IMenuProviderProps> = ({ children }) => {
  const [contextMenu, setContextMenu] = useState<IContextMenu | undefined>(
    undefined
  );

  const [position, setPosition] = useState<
    | {
        top: number;
        left: number;
      }
    | undefined
  >(undefined);

  const openContextMenu =
    (menu: IContextMenu) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setPosition({
        top: e.clientY - 4,
        left: e.clientX - 2,
      });
      setContextMenu({
        ...menu,
        onClose: () => {
          menu.onClose?.();
          setContextMenu(undefined);
          setPosition(undefined);
        },
      });
    };

  const handleClose = () => {
    contextMenu?.onClose?.();
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClose: handleClose,
      });
    }
    return child;
  });

  return (
    <MenuContext.Provider value={{ openContextMenu }}>
      <Menu
        open={contextMenu !== undefined}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          position ? { top: position.top, left: position.left } : undefined
        }
      >
        {contextMenu?.content}
      </Menu>
      {childrenWithProps}
    </MenuContext.Provider>
  );
};

const useContextMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
};

export { useContextMenu, ContextMenuProvider };
