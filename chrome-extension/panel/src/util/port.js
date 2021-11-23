const port = chrome.runtime.connect({
  name: 'panel',
});

port.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

export default port;
