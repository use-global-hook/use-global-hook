import * as React from 'react';
import { newListenerEffect } from "./newListenerEffect";

export function customHook(store, mapState, mapActions, compare) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = mapActions ? mapActions(store.actions) : store.actions;

  const originalHook = React.useState(state)[1];
  const resultObject = [state, actions];

  let localCompare;
  const getComparator = () => localCompare;

  resultObject.shouldUpdate = (compare) => {
    localCompare = compare;

    return resultObject;
  };

  React.useEffect(() => newListenerEffect(store, state, mapState, originalHook, getComparator), []); // eslint-disable-line

  return resultObject;
}
