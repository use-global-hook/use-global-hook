# use-global-hook

Easy state management for react using hooks in less than 1kb.

------------

### Install:

```javascript
npm i use-global-hook
```

### Minimal example:
```javascript
import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  counter: 0,
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
};

const useGlobal = globalHook(React, initialState, actions);

const App = () => {
  const [globalState, globalActions] = useGlobal();
  return (
    <div>
      <p>
        counter:
        {globalState.counter}
      </p>
      <button type="button" onClick={() => globalActions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};

export default App;
```

------------


### Complete examples:
#### [Several counters, one value](https://codesandbox.io/s/v6zz2nwow5 "CodeSandBox")
Add as many counters as you want, it will all share the same global value.
Every time one counter add 1 to the global value, all counters will render.
The parent component won't render again.


------------


#### [Asynchronous ajax requests](https://codesandbox.io/s/wqvykj5497 "CodeSandBox")
Search GitHub repos by username.
Handle the ajax request asynchronously with async/await.
Update the requests counter on every search.


------------


#### [Avoid unnecessary renders](https://codesandbox.io/s/several-counters-pdbsy "CodeSandBox")
Map a subset of the global state before use it.
The component will only re-render if the subset is updated.
