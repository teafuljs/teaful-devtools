import port from './port';

export default function sendMessage(name, data) {
  port.postMessage({
    name: name,
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: data || {},
  });
}
