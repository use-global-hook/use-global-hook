function setState(store, newState, afterUpdateCallback) {
  const listenersLength = store.listeners.length;
  store.state = { ...store.state, ...newState };
  for (let i = 0; i < listenersLength; i++) {
    store.listeners[i](store.state);
  }
  afterUpdateCallback && afterUpdateCallback();
}

function useCustom(store, React, mapState, mapActions) {
  const oldState = store.state;
  const [state, originalHook] = React.useState(
    mapState ? mapState(store.state) : store.state
  );
  const actions = React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  );

  React.useEffect(() => {
    let newListener = mapState
      ? state => originalHook(mapState(state))
      : originalHook;
    store.listeners.push(newListener);
    oldState !== store.state && newListener(store.state);
    return () => {
      store.listeners = store.listeners.filter(
        listener => listener !== newListener
      );
    };
  }, []); // eslint-disable-line
  return [state, actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = { state: initialState, listeners: [] };
  store.setState = setState.bind(null, store);
  store.actions = associateActions(store, actions);
  if (initializer) initializer(store);
  return useCustom.bind(null, store, React);
};

export default useStore;
