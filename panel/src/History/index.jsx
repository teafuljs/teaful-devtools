import React from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import { useStore } from '../index'

export default function History() {
  const [selectedHistory] = useStore.selectedHistory()
  const [selectedStore] = useStore.selectedStore();
  const [history] = useStore.stores[selectedStore].history();
  const currentHistory = history?.[selectedHistory]
  
  if(!history) return null;

  return (
    <main>
      {currentHistory && (
        <ReactDiffViewer 
          styles={{ minHeight: '100vh' }}
          oldValue={currentHistory.prevStore ? JSON.stringify(currentHistory.prevStore, undefined, 2) : undefined} 
          newValue={JSON.stringify(currentHistory.store, undefined, 2)} 
          splitView={true}
        />
      )}
    </main>
  );
}
