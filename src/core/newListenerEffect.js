import { cleanUpListener } from "./cleanUpListener";

export const newListenerEffect = (store, mapState, originalHook) => () => {
  const newListener = {
    isComponentBeingUnmounted: false,
    oldState: undefined,
  };
  newListener.run = (newState) => {
    if (newListener.isComponentBeingUnmounted) {
      return;
    }
    const mappedState = mapState ? mapState(newState) : newState;
    if (mappedState === newListener.oldState) {
      return;
    }
    newListener.oldState = mappedState;
    // call the original hook with a new reference to trigger a re-render
    originalHook(Object.create(null));
  };
  store.listeners.push(newListener);
  return () => {
    newListener.isComponentBeingUnmounted = true;
    cleanUpListener(store, newListener)();
  };
};
