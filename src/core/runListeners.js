export const runListeners = (store) => {
  store.listeners.forEach((listener) => {
    listener.run(store.state);
  });  
};
