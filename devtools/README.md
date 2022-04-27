# Build Teaful devtools

This guide is for how to download the extension and build.

## Getting started

In [**teaful-devtools**](https://github.com/teafuljs/teaful-devtools) there is the code of the extension inside `devtools` folder, and the code of the bridge inside the `bridge` folder.

### Download the extension

Go inside `devtools/panel` folder of `teaful-devtools`. 

- `git clone git@github.com:teafuljs/teaful-devtools.git`
- `cd teaful-devtools/devtools/panel`

### Build the extension

Inside `devtools/panel` execute:

- `yarn && yarn build`

Once the build is done, all the extension code is what is inside the `devtools` folder (`cd ..` from `devtools/panel`).

### To use the extension you need to activate the bridge in your app

1. **Install the bridge in your app**:

```
yarn add teaful-devtools
```


2. **Use the bridge**.

In your main file, where you have the render, you must have the teaful-devtools import at the top, before the imports of your application (components, store, etc).

```js
import 'teaful-devtools' // Bridge
import { render } from 'preact';
import App from './components/App';

render(<App />, document.getElementById('root'));
```