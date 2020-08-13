import { immerPlugin } from "../plugins/immer";

export const setupOptions = (store, options = {}) => {
  //Backward compatibility with 0.1.2
  if (options instanceof Function) {
    options(store);
    return;
  }
  const { Immer, initializer } = options;
  Immer && immerPlugin(Immer, store);
  initializer && initializer(store);
};
