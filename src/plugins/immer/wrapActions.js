import { immerAction } from "./immerAction";

export function wrapActions(store, actions) {
    const wrappedActions = {};
    Object.keys(actions).forEach((key) => {
      if (typeof actions[key] === "function") {
        const originalFunction = actions[key];
        actions[key] = immerAction(store, originalFunction);
      }
      if (typeof actions[key] === "object") {
        wrappedActions[key] = wrapActions(store, actions[key]);
      }
    });
    return wrappedActions;
  }