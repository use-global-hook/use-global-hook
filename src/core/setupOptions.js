import { immerPlugin } from "../plugins/immer";
import { reduxDevToolsPlugin } from "../plugins/reduxDevTools";

export const setupOptions = (store, options = {}) => {
  //Backward compatibility with 0.1.2
  if (options instanceof Function) {
    options(store);
    return;
  }
  const { Immer, initializer, reduxDevTools } = options;
  Immer && immerPlugin(Immer, store);
  reduxDevTools && reduxDevToolsPlugin(store, reduxDevTools);
  initializer && initializer(store);
};
