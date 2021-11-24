 <img src="https://raw.githubusercontent.com/teafuljs/teaful/master/logo.svg" width="70" alt="Teaful" align="left" />

# Teaful DevTools

_Browser extension that allows you to inspect a [Teaful](https://github.com/teafuljs/teaful) store._



## Getting started

1. **Install the DevTools extension**

    - Chrome

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

<div align="center">
<img src="demo.gif" alt="demo" />
</div>

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
