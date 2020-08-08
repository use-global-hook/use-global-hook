import { associateActions } from "./associateActions";
import { setState } from "./setState";
import { customHook } from "./customHook";

const useStore = (React, initialState, actions, initializer) => {
  const store = { state: initialState, listeners: [] };
  store.setState = setState.bind(null, store);
  store.actions = associateActions(store, actions);
  if (initializer) initializer(store);
  return customHook.bind(null, store, React);
};

export default useStore;