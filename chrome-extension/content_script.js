const SOURCE = 'teaful-devtools'

window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return;
  }

  const message = event.data;

  if (typeof message !== 'object' || message === null ||
      message.source !== SOURCE) {
    return;
  }

  chrome.runtime.sendMessage(message);
});

chrome.runtime.onMessage.addListener((request) => {
  request.source = SOURCE;
  window.postMessage(request, '*');
});
