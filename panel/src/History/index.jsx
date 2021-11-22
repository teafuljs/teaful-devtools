import React, { useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import { useStore } from '../index';

export default function History() {
  const [selectedHistory, setSelectHistory] = useStore.selectedHistory();
  const [selectedStore] = useStore.selectedStore();
  const [history] = useStore.stores[selectedStore].history();
  const currentHistory = history?.[selectedHistory];
  const max = history.length - 1;

  useEffect(() => {
    function move(e) {
      const key = e.which || e.keyCode;
      if (key === 38) return setSelectHistory((v) => (v === 0 ? 0 : v - 1));
      if (key === 40) return setSelectHistory((v) => (v === max ? max : v + 1));
    }
    document.addEventListener('keydown', move);
    return () => document.removeEventListener('keydown', move);
  }, [max]);

  if (!history) return null;

  return (
    <main>
      <div className="sidebar">
        {history.map(({ epoch }, i) => (
          <div
            className={i === selectedHistory ? 'active' : ''}
            key={epoch + i}
            onClick={() => setSelectHistory(i)}
          >
            {new Date(epoch).toLocaleString()}
          </div>
        ))}
      </div>
      <div className="code">
        {currentHistory && (
          <ReactDiffViewer
            useDarkTheme={
              window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            hideLineNumbers
            oldValue={currentHistory.prevStore}
            newValue={currentHistory.store}
            splitView={false}
          />
        )}
      </div>
    </main>
  );
}
