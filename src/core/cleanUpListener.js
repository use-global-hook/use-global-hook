export const cleanUpListener = (store, newListener) => () => {
  store.listeners = store.listeners.filter(
    (listener) => listener !== newListener
  );
};
