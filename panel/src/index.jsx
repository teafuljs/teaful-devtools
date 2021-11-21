import { h, render } from 'preact';
import createStore from 'teaful';
import Header from './Header';
import History from './History';

import 'preact/devtools';
import './index.css';

export const { useStore, getStore } = createStore({
  selectedStore: 0,
  selectedHistory: 0,
  stores: [
    {
      name: '#1',
      history: [
        {
          epoch: 1637488941322,
          store: { count: 0 },
        },
        {
          epoch: 1637488941322,
          store: { count: 1 },
          prevStore: { count: 0 },
        },
        {
          epoch: 1637488951322,
          store: { count: 2 },
          prevStore: { count: 1 },
        },
        {
          epoch: 1637488961322,
          store: { count: 3 },
          prevStore: { count: 2 },
        },
        {
          epoch: 1637488971322,
          store: { count: 0 },
          prevStore: { count: 3 },
        },
      ],
    },
    {
      name: '#2',
      history: [
        {
          epoch: 1637488941322,
          store: { username: 'Aral', age: 31 },
        },
      ],
    },
    { name: '#3', history: [] },
  ],
});

function App() {
  return (
    <div className="devtools">
      <Header />
      <History />
    </div>
  );
}

render(<App />, document.getElementById('root'));
