import { withReduxDevTools } from './withReduxDevTools';

export const wrapActions = (store, actions, devTools) => {
  const wrappedActions = {};
  Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === "function") {
      const originalFunction = actions[key];
      actions[key] = withReduxDevTools(key, store, originalFunction, devTools);
    }
    if (typeof actions[key] === "object") {
      wrappedActions[key] = wrapActions(store, actions[key]);
    }
  });
};
