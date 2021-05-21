import { cleanUpListener } from "./cleanUpListener";

export const newListenerEffect = (store, mapState, originalHook) => () => {
  const newListener = { oldState: {} };
  newListener.run = mapState
    ? (newState) => {
        const mappedState = mapState(newState);
        if (mappedState !== newListener.oldState) {
          newListener.oldState = mappedState;
          originalHook(mappedState);
        }
      }
    : originalHook;
  newListener.run(store.state);
  store.listeners.push(newListener);
  return cleanUpListener(store, newListener);
};
