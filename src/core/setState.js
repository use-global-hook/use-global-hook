import { runListeners } from "./runListeners";

export function setState(store, newState, afterUpdateCallback) {
  store.state = { ...store.state, ...newState };
  runListeners(store, afterUpdateCallback);
}
