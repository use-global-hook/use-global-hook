import { wrapActions } from "./wrapActions";

export const immerPlugin = (Immer, store) => {
  const _setState = store.setState;
  store.setState = (input) => {
    if (input instanceof Function) {
      store.state = Immer(store.state, input);
      store.runListeners();
    } else {
      _setState(input);
    }
  };
  wrapActions(store, store.actions);
};
