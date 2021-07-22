export function setState(store, newState, afterUpdateCallback) {
  store.state = { ...store.state, ...newState };
  store.runListeners();
  afterUpdateCallback && afterUpdateCallback();
}
