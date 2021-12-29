import createStore from 'teaful'

/**
 * How to use it:
 * @example 
 * 
 * // Must be the first import of your app (before components imports)
 * import "teaful-devtools";
 * import { render } from 'preact';
 * import App from './components/App';
 *
 * render(<App />, document.getElementById('root'));
 * 
 */
function initDevtools() {
  if (typeof window === 'undefined') return

  window.__TEAFUL_DEVTOOLS__ = [];

  // Register devtools bridge extra
  createStore.ext((params, subscription) => {
    let index = window.__TEAFUL_DEVTOOLS__.push(params.getStore) - 1;

    // s = subscribe (minified by Teaful)
    subscription.s(".", ({ store, prevStore }) => {
      try {
        window.postMessage(
          { 
            source: "teaful-devtools", 
            store, 
            prevStore, 
            index, 
            stack: Error().stack,
          },
          "*"
        );
      } catch (e) {
        console.warn('teaful-devtools failed to report store state.');
        console.warn('Perhaps you are storing an unserializable object.');
      }
    });
  });
}

initDevtools()
