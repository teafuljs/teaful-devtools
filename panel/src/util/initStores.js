import { getStore } from '../store.js';

/**
 * @example
 * window.__TEAFUL_DEVTOOLS__ = [() => getStore()[0]] // for all stores
 */
const TEAFUL = 'window.__TEAFUL_DEVTOOLS__';

export default function initStores() {
  return new Promise((res, rej) => {
    chrome.devtools.inspectedWindow.eval(
      `Array.isArray(${TEAFUL})`,
      (result, isException) => {
        if (!result || isException) return rej();
        chrome.devtools.inspectedWindow.eval(
          `${TEAFUL}.map((getStore, index) => ({ 
            name: '#' + (index + 1), 
            history: [{ 
              epoch: Date.now(), 
              store: JSON.stringify(getStore(), undefined, 2)
            }]
            })
          )`,
          (stores, isException) => {
            if (!stores || isException) return rej();
            const [, setStores] = getStore.stores();
            setStores(stores);
            res();
          },
        );
      },
    );
  });
}
