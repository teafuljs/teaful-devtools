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

3. **Call the bridge before any `createStore` call**.

```js
import createStore from 'teaful'
import devtoolsBridge from 'teaful-devtools'

if (process.env.NODE_ENV === 'development') {
  devtoolsBridge()
}

const { useStore } = createStore({})
```

>It's a function to call it in **develpment mode**.
>
>It's not recommended in production since anyone could see all the store modifications and modify the content of the store.
>
>So the responsibility lies with who uses the library.

4. **Try it!**

<div align="center">
<img src="demo.gif" alt="demo" />
</div>
