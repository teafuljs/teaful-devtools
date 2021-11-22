import React from 'react';
import { useStore } from '../store';
import initStores from '../util/initStores';
import IconClear from './icon-clear';
import IconAdd from './icon-add';

export default function Header() {
  const [stores] = useStore.stores();
  const [, setSelectHistory] = useStore.selectedHistory();
  const [selectedStore, setSelectedStore] = useStore.selectedStore();
  const iconStyle = { width: 13, fill: 'currentColor' };

  function clearHistory() {
    initStores();
    setSelectHistory(0);
  }

  function addStoreModification() {
    alert('todo');
  }

  return (
    <header>
      <div>
        <button
          title="Add a store modification"
          onClick={addStoreModification}
          className="transparent-button"
        >
          <IconAdd style={iconStyle} />
        </button>
        <button
          title="Clear history of modifications"
          onClick={clearHistory}
          className="transparent-button"
        >
          <IconClear style={iconStyle} />
        </button>
      </div>
      <div>
        <b>Store:</b>
        <select
          value={selectedStore}
          className="store"
          onChange={(e) => {
            setSelectedStore(+e.target.value);
            setSelectHistory(0);
          }}
        >
          {stores.map((store, index) => (
            <option key={index} value={index}>
              {store.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
