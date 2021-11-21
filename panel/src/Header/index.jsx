import React from 'react';
import { useStore } from '../index';

export default function Header() {
  const [stores] = useStore.stores();
  const [, setSelectHistory] = useStore.selectedHistory();
  const [selectedStore, setSelectedStore] = useStore.selectedStore();

  return (
    <header>
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
    </header>
  );
}
