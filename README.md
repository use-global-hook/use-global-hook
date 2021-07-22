# use-global-hook

Easy state management for react using hooks in less than 1kb.

------------
Table of Contents
* [Install](#install)
* [Example](#minimal-example)
* [Complete Examples](#complete-examples)
* [Using TypeScript](#using-typescript)

### Install:

```sh
npm i use-global-hook
```

or

```sh
yarn add use-global-hook
```

### Minimal example:
```jsx
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

const useGlobal = globalHook(initialState, actions);

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

------------


#### [Connecting to a class component](https://codesandbox.io/s/connect-a-class-component-rgbf1 "CodeSandBox")
Hooks can't be used inside a class component.
We can create a Higher-Order Component that connects any class component with the state.
With the connect() function, state and actions become props of the component.


------------


#### [Immutable state with Immer.js integration](https://codesandbox.io/s/immer-integration-e1hpj "CodeSandBox")
Add Immer.js lib on your hook options to manage complex immutable states.
Mutate a state draft inside a setState function.
Immer will calculate the state diff and create a new immutable state object.


------------

### Using TypeScript

Install the TypeScript definitions from DefinitelyTyped
```
npm install @types/use-global-hook
```

Example implementation
```typescript
import globalHook, { Store } from 'use-global-hook';

// Defining your own state and associated actions is required
type MyState = {
  value: string;
};

// Associated actions are what's expected to be returned from globalHook
type MyAssociatedActions = {
  setValue: (value: string) => void;
  otherAction: (other: boolean) => void;
};

// setValue will be returned by globalHook as setValue.bind(null, store)
// This is one reason we have to declare a separate associated actions type
const setValue = (
  store: Store<MyState, MyAssociatedActions>,
  value: string
) => {
  store.setState({ ...store.state, value });
  store.actions.otherAction(true);
};

const otherAction = (
  store: Store<MyState, MyAssociatedActions>,
  other: boolean
) => { /* cool stuff */ };

const initialState: MyState = {
  value: "myString"
};

// actions passed to globalHook do not need to be typed
const actions = {
  setValue,
  otherAction
};

const useGlobal = globalHook<MyState, MyAssociatedActions>(
  initialState,
  actions
);

// Usage
const [state, actions] = useGlobal<MyState, MyAssociatedActions>();

// Subset
const [value, setValue] = useGlobal<string, (value: string) => void>(
  (state: MyState) => state.value,
  (actions: MyAssociatedActions) => actions.setValue
);

// Without declaring type, useGlobal will return unknown
const [state, actions] = useGlobal(); // returns [unknown, unknown]

// Happy TypeScripting!
```
