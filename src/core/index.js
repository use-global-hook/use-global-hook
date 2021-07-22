import { associateActions } from "./associateActions";
import { setState } from "./setState";
import { customHook } from "./customHook";
import { runListeners } from "./runListeners";
import { setupOptions } from "./setupOptions";

const useStore = (React, initialState, actions, options) => {
  const store = { state: initialState, listeners: [], plugins: { hooks: [] } };
  store.setState = setState.bind(null, store);
  store.runListeners = runListeners.bind(null, store);
  store.actions = associateActions(store, actions);
  setupOptions(store, options);
  return customHook.bind(null, store, React);
};

export default useStore;
