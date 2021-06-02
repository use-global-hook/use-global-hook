import { newListenerEffect } from "./newListenerEffect";

const getMappedActions = (store, React, mapActions) =>
  React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  );

export function customHook(store, React, mapState, mapActions) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = getMappedActions(store, React, mapActions);

  const originalHook = React.useState(Object.create(null))[1];

  React.useEffect(newListenerEffect(store, mapState, originalHook), []); // eslint-disable-line

  // allow plugins to define theirs hooks
  store.plugins.hooks.forEach(hook => hook(React));

  return [state, actions];
}
