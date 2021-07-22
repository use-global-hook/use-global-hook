export const withReduxDevTools = (key, store, originalFunction, devTools) => (...args) => {
  originalFunction(...args);

  devTools?.send(key, store.state);
};
