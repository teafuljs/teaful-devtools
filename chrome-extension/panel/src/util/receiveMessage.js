import port from './port';
import { getStore } from '../store';

function receiveMessage({ source, store: s, prevStore: p, index = 0, stack }) {
  if (source !== 'teaful-devtools') return;
  const store = s ? JSON.stringify(s, undefined, 2) : undefined;
  const prevStore = p ? JSON.stringify(p, undefined, 2) : undefined;
  const [showAdd] = getStore.showAdd();
  const [, setHistory] = getStore.stores[index].history();
  const [, setSelectedHistory] = getStore.selectedHistory();
  const [, setNewHistory] = getStore.newHistory();
  const [, setSelectedStore] = getStore.selectedStore();
  console.log({ stack })
  setHistory((h) => [{ epoch: Date.now(), store, prevStore }, ...h]);
  setSelectedStore(index);
  setSelectedHistory(0);
  if (!showAdd) setNewHistory(store);
  document.querySelector('.sidebar').scrollTop = 0;
}

export const registerReceiveMessage = () =>
  port.onMessage.addListener(receiveMessage);
export const unregisterReceiveMessage = () =>
  port.onMessage.removeListener(receiveMessage);
