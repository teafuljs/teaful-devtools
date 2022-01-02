 <img src="https://raw.githubusercontent.com/teafuljs/teaful/master/assets/logo.svg" width="70" alt="Teaful" align="left" />
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Teaful DevTools

_Browser extension that allows you to inspect a [Teaful](https://github.com/teafuljs/teaful) store._


[![npm version](https://badge.fury.io/js/teaful-devtools.svg)](https://badge.fury.io/js/teaful-devtools)
[![gzip size](https://img.badgesize.io/https://unpkg.com/teaful-devtools?compression=gzip&label=gzip)](https://unpkg.com/teaful-devtools)
[![CI Status](https://github.com/teafuljs/teaful-devtools/actions/workflows/test.yml/badge.svg)](https://github.com/teafuljs/teaful-devtools/actions/workflows/test.yml)
[![Maintenance Status](https://badgen.net/badge/maintenance/active/green)](https://github.com/teafuljs/teaful-devtools#maintenance-status)
[![Weekly downloads](https://badgen.net/npm/dw/teaful-devtools?color=blue)](https://www.npmjs.com/package/teaful-devtools)
[![GitHub Discussions: Chat With Us](https://badgen.net/badge/discussions/chat%20with%20us/purple)](https://github.com/teafuljs/teaful-devtools/discussions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/teafuljs/teaful-devtools/pulls)

<div align="center">
<img src="demo.png" alt="demo" />
</div>

## Features ✨

- Debug stores changes (when, what, where, who, how & why)
- Modify stores
- Dark & light mode


## Getting started

1. **Install the DevTools extension**

    - [Chrome](https://chrome.google.com/webstore/detail/teaful-devtools/lficdnnjoackdnaddfcgllmjdocofadc)
    - [Firefox](https://addons.mozilla.org/es/firefox/addon/teaful-devtools/)
    - [Edge](https://microsoftedge.microsoft.com/addons/detail/teaful-devtools/kcplohinngjiammdehjlimgdpamhhkmn?hl=en-GB)

2. **Install the bridge in your app**:

```
yarn add teaful-devtools
```

Tiny tiny... 😊 _(~200 B)_

3. **Use the bridge**.

In your main file, where you have the render, you must have the teaful-devtools import at the top, before the imports of your application (components, store, etc).

```js
import 'teaful-devtools'
import { render } from 'preact';
import App from './components/App';

render(<App />, document.getElementById('root'));
```

4. **Try it!**

## How to strip devtools from production

Most bundlers allow you strip out code when they detect that a branch inside an if-statement will never be hit. We can use this to only include `teaful-devtools` during development and save those precious bytes in a production build.

```js
// Must be the first import
if (process.env.NODE_ENV==='development') {
  // Must use require here as import statements are only allowed
  // to exist at top-level.
  require("teaful-devtools");
}

import { render } from 'preact';
import App from './components/App';

render(<App />, document.getElementById('root'));
```

Make sure to set the `NODE_ENV` variable to the correct value in your build tool.


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://mrclay.org/"><img src="https://avatars.githubusercontent.com/u/170687?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steve Clay</b></sub></a><br /><a href="https://github.com/teafuljs/teaful-devtools/issues?q=author%3Amrclay" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!