import { h, render } from 'preact';
import { useState, useEffect } from 'react';

import AddModification from './AddModification';
import Header from './Header';
import History from './History';
import getTheme from './util/getTheme';
import initStores from './util/initStores';
import { useStore } from './store';
import {
  registerReceiveMessage,
  unregisterReceiveMessage,
} from './util/receiveMessage';

import 'antd/dist/antd.css';
import './styles.css';

function App() {
  const [showAdd] = useStore.showAdd();
  const [status, setStatus] = useState('loading');
  const [stores] = useStore.stores();

  useEffect(() => {
    document.body.classList.add(getTheme());
    initStores()
      .then(() => {
        registerReceiveMessage();
        setStatus('ok');
      })
      .catch(() => setStatus('ko'));

    return unregisterReceiveMessage;
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

  if (stores.length === 0) {
    return (
      <div className="devtools message">
        No Teaful store has been found.
        <button
          style={{ marginLeft: 10, fontSize: 12, cursor: 'pointer' }}
          onClick={() => {
            setStatus('loading');
            initStores()
              .then(() => setStatus('ok'))
              .catch(() => setStatus('ko'));
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="devtools">
      <Header />
      {showAdd ? <AddModification /> : <History />}
    </div>
  );
}

render(<App />, document.getElementById('root'));
