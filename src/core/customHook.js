import { newListenerEffect } from "./newListenerEffect";

export function customHook(store, React, mapState, mapActions) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = mapActions ? mapActions(store.actions) : store.actions;

  const originalHook = React.useState(Object.create(null))[1];

  React.useEffect(newListenerEffect(store, mapState, originalHook), []); // eslint-disable-line

  return [state, actions];
}
