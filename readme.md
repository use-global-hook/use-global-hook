# use-global-hook

[![npm version](https://badge.fury.io/js/use-global-hook.svg)](https://badge.fury.io/js/use-global-hook)

Easy state manegment for react using hooks in less than 1kb.

------------
## Getting started

React use-global-hook requires **React 16.8 or later.**

#### Install with NPM

```
$ npm install use-global-hook --save
```

## Example:
```javascript
import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  counter: 0,
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
};

const useGlobal = useGlobalHook(React, initialState, actions);

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