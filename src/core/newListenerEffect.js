import { cleanUpListener } from "./cleanUpListener";

export const newListenerEffect = (store, oldState, mapState, originalHook) => {
  const newListener = { oldState };
  newListener.run = mapState
    ? (newState) => {
        const mappedState = mapState(newState);
        if (mappedState !== newListener.oldState) {
          newListener.oldState = mappedState;
          originalHook(newState);
        }
      }
    : originalHook;

  store.listeners.push(newListener);
  return cleanUpListener(store, newListener);
};
