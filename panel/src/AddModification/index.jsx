import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

import { useStore } from '../store';

export default function AddModification() {
  const epoch = useRef(Date.now());
  const [showAdd, setShowAdd] = useStore.showAdd();
  const [selectedStore] = useStore.selectedStore();
  const [history] = useStore.stores[selectedStore].history();
  const [newHistory, setNewHistory] = useState(history[0].store);
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'monokai'
    : 'github';

  return (
    <>
      <AceEditor
        mode="json"
        value={newHistory}
        theme={theme}
        style={{ width: '100%', height: 'calc(100vh - 60px)' }}
        onChange={setNewHistory}
        name={epoch}
        editorProps={{ $blockScrolling: true }}
      />
      <footer className="save-modification">
        <button
          onClick={() => setShowAdd(false)}
          className="transparent-button"
        >
          Cancel
        </button>
        <button className="transparent-button">Apply store modification</button>
      </footer>
    </>
  );
}
