import { h, render } from 'preact';
import { useState, useEffect } from 'react';
import createStore from 'teaful';
import Header from './Header';
import History from './History';
import port from './util/port'

import './index.css';

/**
 * @example
 * window.__TEAFUL_DEVTOOLS__ = [() => getStore()[0]] // for all stores
 */
const TEAFUL = 'window.__TEAFUL_DEVTOOLS__';

export const { useStore, getStore } = createStore({
  selectedStore: 0,
  selectedHistory: 0,
  stores: [],
});

function increaseHistory({ source, store, prevStore, index = 0 }) {
  if(source !== 'teaful-devtools') return
  const [history, setHistory] = getStore.stores[index].history()
  const [, setSelectedHistory] = getStore.selectedHistory()
  const [, setSelectedStore] = getStore.selectedStore()
  setHistory(h => [...h, { epoch: Date.now(), store, prevStore }]);
  setSelectedStore(index);
  setSelectedHistory(history.length);
}

function App() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    chrome.devtools.inspectedWindow.eval(
      `Array.isArray(${TEAFUL})`,
      (result, isException) => {
        if (!result || isException) return setStatus('ko');
        chrome.devtools.inspectedWindow.eval(
          `${TEAFUL}.map((getStore, index) => ({ 
            name: '#' + (index + 1), 
            history: [{ 
              epoch: Date.now(), 
              store: getStore()
            }]
           })
          )`,
          (stores, isException) => {
            if (!stores || isException) return setStatus('ko');
            const [, setStores] = getStore.stores();
            setStores(stores);
            setStatus('ok');
            port.onMessage.addListener(increaseHistory);
          },
        );
      },
    );
    return () => port.onMessage.removeListener(increaseHistory);
  }, []);

  if (status === 'ko') {
    return (
      <div className="devtools message">
        This page is not compatible with{' '}
        <a href="https://github.com/teafuljs/teaful-devtools" target="_blank">
          Teaful DevTools
        </a>
        .
      </div>
    );
  }

  if (status === 'loading') {
    return null;
  }

  return (
    <div className="devtools">
      <Header />
      <History />
    </div>
  );
}

render(<App />, document.getElementById('root'));
