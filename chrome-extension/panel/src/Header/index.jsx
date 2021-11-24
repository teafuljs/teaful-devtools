import React from 'react';
import message from 'antd/lib/message';

import IconAdd from './icon-add';
import IconClear from './icon-clear';
import initStores from '../util/initStores';
import { useStore, getStore } from '../store';

export default function Header() {
  const [stores] = useStore.stores();
  const [showAdd, setShowAdd] = useStore.showAdd();
  const [, setSelectHistory] = useStore.selectedHistory();
  const [selectedStore, setSelectedStore] = useStore.selectedStore();
  const iconStyle = { width: 13, fill: 'currentColor' };

  function hideAdd() {
    if (!showAdd) return false;

    const [history] = getStore.stores[selectedStore].history();
    const [newHistory] = getStore.newHistory();

    setShowAdd(false);
    if (history[0].store !== newHistory) {
      message.warning(
        'The modification panel was closed without applying the changes.',
      );
    }

    return true;
  }

  function clearHistory() {
    initStores();
    hideAdd();
    setSelectHistory(0);
  }

  return (
    <header>
      <div className="buttons">
        <button
          title="Add a store modification"
          onClick={() => !hideAdd() && setShowAdd(true)}
          className={`transparent-button ${showAdd ? 'active' : ''}`}
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
