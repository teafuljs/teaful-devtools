import port from './port';
import { getStore } from '../store';

function receiveMessage({ source, store: s, prevStore: p, index = 0 }) {
  if (source !== 'teaful-devtools') return;
  const store = s ? JSON.stringify(s, undefined, 2) : undefined;
  const prevStore = p ? JSON.stringify(p, undefined, 2) : undefined;
  const [, setHistory] = getStore.stores[index].history();
  const [, setSelectedHistory] = getStore.selectedHistory();
  const [, setSelectedStore] = getStore.selectedStore();
  setHistory((h) => [{ epoch: Date.now(), store, prevStore }, ...h]);
  setSelectedStore(index);
  setSelectedHistory(0);
  document.querySelector('.sidebar').scrollTop = 0;
}

export const registerReceiveMessage = () =>
  port.onMessage.addListener(receiveMessage);
export const unregisterReceiveMessage = () =>
  port.onMessage.removeListener(receiveMessage);
