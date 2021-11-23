import createStore from "teaful";

/**
 * 
 * It's a function to call it in develpment mode.
 *  
 * It's not recommended in production since anyone could see all
 * the store modifications and modify the content of the store.
 * 
 * So the responsibility lies with who uses the library. 
 * 
 * @example To use it:
 * 
 * import createStore from 'teaful';
 * import devtoolsBridge from 'teaful-devtools';
 * 
 * if (process.env.NODE_ENV === 'development') {
 *   devtoolsBridge()
 * }
 * 
 * export const { useStore, getStore } = createStore({});
 */
export default function devtoolsBridge() {
  window.__TEAFUL_DEVTOOLS__ = [];

  // Register devtools bridge extra
  createStore.ext((params, subscription) => {
    let index = window.__TEAFUL_DEVTOOLS__.push(params.getStore) - 1;

    // s = subscribe (minified by Teaful)
    subscription.s(".", ({ store, prevStore }) => {
      window.postMessage(
        { source: "teaful-devtools", store, prevStore, index },
        "*"
      );
    });
  });
}
