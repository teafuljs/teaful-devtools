import React from 'react';
import { useStore, getStore } from '../index'

export default function Header() {
  const [stores] = useStore.stores();
  const [selectedStore] = useStore.selectedStore();
  const [history] = useStore.stores[selectedStore].history();

  return (
    <header>
      <div>
        <b>Store:</b>
        <select className="store" onChange={onChangeStore}>
          {stores.map((store, index) => (
            <option key={index} value={index}>{store.name}</option>
          ))}
        </select>
      </div>
      <div>
      <b>History:</b>
      <select onChange={onChangeHistoryPreview}>
        {history.map(({ epoch }, i) => (
          <option key={epoch+i} value={i}>
            {i === 0 ? 'Initial store' : new Date(epoch).toLocaleString()}
          </option>
        ))}
      </select>
      </div>
    </header>
  );
}

function onChangeStore(event) {
  const [, setSelectedStore] = getStore.selectedStore()
  setSelectedStore(+event.target.value)
}

function onChangeHistoryPreview(event) {
  const [, setSelectHistory] = getStore.selectedHistory()
  setSelectHistory(+event.target.value)
}
