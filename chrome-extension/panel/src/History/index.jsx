import React, { useEffect, useRef } from 'react';
import ReactDiffViewer from 'react-diff-viewer';

import stackStringToArray from '../util/stackStringToArray';
import { useStore } from '../store';

export default function History() {
  const btn = useRef();
  const code = useRef();
  const [selectedHistory, setSelectHistory] = useStore.selectedHistory();
  const [selectedStore] = useStore.selectedStore();
  const [showStack, setShowStack] = useStore.showStack();
  const [history] = useStore.stores[selectedStore].history();
  const currentHistory = history?.[selectedHistory];
  const max = history?.length - 1;

  useEffect(() => {
    function move(e) {
      const key = e.which || e.keyCode;
      if (key === 38) return setSelectHistory((v) => (v === 0 ? 0 : v - 1));
      if (key === 40) return setSelectHistory((v) => (v === max ? max : v + 1));
    }
    document.addEventListener('keydown', move);
    return () => document.removeEventListener('keydown', move);
  }, [max]);

  // Scroll to stack
  useEffect(() => {
    if (showStack && btn.current) {
      btn.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [showStack]);

  if (!history) return null;

  return (
    <main>
      <div className="sidebar">
        {history.map(({ epoch }, i) => (
          <div
            className={i === selectedHistory ? 'active' : ''}
            key={epoch + i}
            onClick={() => {
              setSelectHistory(i);
              setShowStack(false);
            }}
          >
            <div style={{ fontWeight: 'bold' }}>#{history.length - i}</div>
            <small>
              {new Intl.DateTimeFormat(undefined, {
                timeStyle: 'medium',
              }).format(new Date(epoch))}
            </small>
          </div>
        ))}
      </div>
      <div ref={code} className="code">
        {currentHistory && (
          <>
            <div>
              <ReactDiffViewer
                useDarkTheme={
                  window.matchMedia('(prefers-color-scheme: dark)').matches
                }
                hideLineNumbers
                oldValue={currentHistory.prevStore}
                newValue={currentHistory.store}
                splitView={false}
              />
            </div>
            {currentHistory.stack && (
              <div className="stack-wrapper">
                <div className="stack">
                  <button ref={btn} onClick={(e) => setShowStack((v) => !v)}>
                    {showStack ? '▲ ' : '▼ '}
                    Stack trace
                  </button>
                </div>
                {showStack && (
                  <ul className="stack-list">
                    {stackStringToArray(currentHistory.stack).map((l) => {
                      const file = l.file + ':' + l.line + ':' + l.column;

                      return (
                        <li key={file}>
                          <div>{l.function}</div>
                          <a
                            onClick={() => {
                              chrome.devtools.panels.openResource(
                                l.file,
                                l.line,
                                l.column,
                              );
                            }}
                            href="javascript:void(0)"
                          >
                            {file}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
