# use-global-hook

Easy state manegment for react using hooks in less than 1kb.

Minimal example:
```javascript
import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  counter: 0,
};

const actions = {
  addToCounter: (store, amount) => {
    const counter = store.state.counter + amount;
    store.setState({ counter });
  },
};