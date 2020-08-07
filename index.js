
function setState(store, newState, afterUpdateCallback) {
  store.state = { ...store.state, ...newState };
  store.listeners.forEach((listener) => {
    listener.run(store.state);
  });
  afterUpdateCallback && afterUpdateCallback();
}

function useCustom(store, React, mapState, mapActions) {
  const state = mapState ? mapState(store.state) : store.state;
  const actions = React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  );
  const [, originalHook] = React.useState(Object.create(null));

  React.useEffect(() => {
    const newListener = { oldState: {} };
    newListener.run = mapState
      ? newState => {
        const mappedState = mapState(newState);
        if (mappedState !== newListener.oldState) {
          newListener.oldState = mappedState;
          originalHook(mappedState);
        }
      }
      : originalHook;
    store.listeners.push(newListener);
    return () => {
      store.listeners = store.listeners.filter(
        listener => listener !== newListener
      );
      store.state = store.listeners.length <= 0 ? initialState : store.state
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
  return useCustom.bind(null, store, React, initialState);
};

// fix for issue #27
// export default useStore;
module.exports = useStore;
