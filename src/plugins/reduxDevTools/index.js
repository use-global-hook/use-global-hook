import { wrapActions } from "./wrapActions";
import { connectDevTools } from './connectDevTools';

export const reduxDevToolsPlugin = (store, options) => {
  const devTools = connectDevTools(options);

  devTools?.init(store.state);

  store.plugins = {
    hooks: [
      ...store.plugins.hooks,
      (React) => {
        React.useEffect(() => {
          if (!devTools) {
            return;
          }

          const unsubscribe = devTools.subscribe((message) => {
            // time traveling
            if (message.type === 'DISPATCH' && message.payload.type === 'JUMP_TO_STATE') {
              store.setState(JSON.parse(message.state));
            }
          });

          return () => {
            unsubscribe();
            devTools.unsubscribe?.();
          }
        }, []);
      }
    ],
  };

  wrapActions(store, store.actions, devTools);
};
