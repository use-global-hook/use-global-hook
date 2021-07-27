import { cleanUpListener } from "./cleanUpListener";

export const newListenerEffect = (store, oldState, mapState, originalHook, getComparator) => {
  const newListener = { oldState };
  newListener.run = (newState) => {
    const compare = getComparator();

    if (!mapState && !compare) {
      return originalHook(newState);
    }

    const mappedState = mapState ? mapState(newState) : newState;
    const updateNeeded = compare
      ? compare(newListener.oldState, mappedState)
      : mappedState !== newListener.oldState;

    if (updateNeeded) {
      newListener.oldState = mappedState;
      originalHook(newState);
    }
  };

  store.listeners.push(newListener);
  return cleanUpListener(store, newListener);
};
