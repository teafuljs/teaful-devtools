import React from 'react';
import { useStore } from '../store';
import initStores from '../util/initStores';
import IconClear from './icon-clear';
import IconAdd from './icon-add';

export default function Header() {
  const [stores] = useStore.stores();
  const [showAdd, setShowAdd] = useStore.showAdd();
  const [, setSelectHistory] = useStore.selectedHistory();
  const [selectedStore, setSelectedStore] = useStore.selectedStore();
  const iconStyle = { width: 13, fill: 'currentColor' };

  function clearHistory() {
    initStores();
    setShowAdd(false);
    setSelectHistory(0);
  }

  return (
    <header>
      <div className="buttons">
        <button
          title="Add a store modification"
          onClick={() => setShowAdd((v) => !v)}
          className="transparent-button"
        >
          <IconAdd
            style={{ ...iconStyle, ...(showAdd ? { fill: '#8ab4f8' } : {}) }}
          />
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
