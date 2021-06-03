import * as React from 'react';
import { newListenerEffect } from "./newListenerEffect";

const getMappedActions = (store, mapActions) =>
  React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  );

export function customHook(store, mapState, mapActions) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = getMappedActions(store, mapActions);

  const originalHook = React.useState(Object.create(null))[1];

  React.useEffect(newListenerEffect(store, mapState, originalHook), []); // eslint-disable-line

  return [state, actions];
}
