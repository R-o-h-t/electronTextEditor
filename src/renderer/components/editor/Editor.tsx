/* eslint-disable no-console */
import Grid from '@mui/material/Unstable_Grid2';
import {
  editorStateFromRaw,
  editorStateToJSON,
  MegadraftEditor,
} from 'megadraft';
import 'megadraft/dist/css/megadraft.css';
import { FC, useEffect, useState } from 'react';
import File from 'renderer/contexts/directory/fs/File';
import './editor.scss';
import Sidebar from './sidebar/Sidebar';

interface EditorProps {
  file: File;
}

const Editor: FC<EditorProps> = ({ file }) => {
  const [editorState, setEditorState] = useState(editorStateFromRaw(null));

  useEffect(() => {
    if (file) {
      const content = file.open();
      setEditorState(
        editorStateFromRaw(content === '{}' ? null : JSON.parse(content))
      );
    }
  }, [file]);

  const handleChange = (es: any) => {
    file.content = editorStateToJSON(es);
    setEditorState(es);
  };

  return (
    <Grid
      sx={{
        color: 'text.primary',
      }}
    >
      <MegadraftEditor
        editorState={editorState}
        onChange={handleChange}
        placeholder="..."
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sidebarRendererFn={(arg0: any) => (
          <Sidebar
            plugins={arg0.plugins}
            editorState={arg0.editorState}
            file={file}
            // alwaysVisible
          />
        )}
      />
    </Grid>
  );
};

export default Editor;
