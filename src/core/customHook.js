import * as React from 'react';
import { newListenerEffect } from "./newListenerEffect";

export function customHook(store, mapState, mapActions) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = mapActions ? mapActions(store.actions) : store.actions;

  const originalHook = React.useState(state)[1];

  React.useEffect(() => newListenerEffect(store, state, mapState, originalHook), []); // eslint-disable-line

  return [state, actions];
}
