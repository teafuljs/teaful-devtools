chrome.devtools.panels.create(
  'Teaful',
  'img/logo_128x128.png',
  'panel/build/index.html',
  function () {}
);

chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
    function(sidebar) {
        // sidebar initialization code here
        sidebar.setObject({ some_data: "Some data to show" });
});