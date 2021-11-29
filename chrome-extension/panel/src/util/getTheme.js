export default function getTheme() {
  return chrome.devtools?.panels?.themeName === 'dark' ? 'dark' : 'light';
}
