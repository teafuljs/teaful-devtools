import { h, render } from 'preact';
import { useState, useEffect } from 'react';

import Header from './Header';
import History from './History';
import initStores from './util/initStores';
import {
  registerReceiveMessage,
  unregisterReceiveMessage,
} from './util/receiveMessage';

import './styles.css';

function App() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
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

  return (
    <div className="devtools">
      <Header />
      <History />
    </div>
  );
}

render(<App />, document.getElementById('root'));
