import { newListenerEffect } from "./newListenerEffect";

const getMappedActions = (store, React, mapActions) =>
  React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  );

export function customHook(store, React, mapState, mapActions) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = getMappedActions(store, React, mapActions);

  const originalHook = React.useState(state)[1];

  React.useEffect(newListenerEffect(store, state, mapState, originalHook), []); // eslint-disable-line

  return [state, actions];
}
