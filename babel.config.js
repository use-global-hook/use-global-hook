import { env, plugins, sourceType } from './babel.internals';

export default (api) => {
  api.cache(true);
  return {
    babelrcRoots: ['.'],
    ignore: [/node_modules/],
    env,
    plugins,
    sourceType,
  };
};
