export const runListeners = (store, afterUpdateCallback) => {
  store.listeners.forEach((listener) => {
    listener.run(store.state);
  });
  afterUpdateCallback && afterUpdateCallback();
};
