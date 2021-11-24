import React, { useRef } from 'react';
import AceEditor from 'react-ace';
import message from 'antd/lib/message';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

import { useStore } from '../store';
import { TEAFUL } from '../constants';

export default function AddModification() {
  const epoch = useRef(Date.now());
  const [, setShowAdd] = useStore.showAdd();
  const [selectedStore] = useStore.selectedStore();
  const [history] = useStore.stores[selectedStore].history();
  const [newHistory, setNewHistory] = useStore.newHistory(history?.[0]?.store);
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'monokai'
    : 'github';

  function modify() {
    try {
      JSON.parse(newHistory); // verify is valid JSON
      chrome.devtools.inspectedWindow.eval(
        `${TEAFUL}[${selectedStore}]()[1](${newHistory})`,
        (_, isException) => {
          if (isException) return message.error('Failed to modify store');
          setShowAdd(false);
          message.success('Store modified');
        },
      );
    } catch (e) {
      message.error(`Error: The store must be in JSON format. ${e.message}`);
    }
  }

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
        <button onClick={modify} className="transparent-button">
          Apply store modification
        </button>
      </footer>
    </>
  );
}
