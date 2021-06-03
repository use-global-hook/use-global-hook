export function setState(store, newState) {
  store.state = { ...store.state, ...newState };
  store.runListeners();
}
