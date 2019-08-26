import { env, sourceType, plugins } from './babel.internals';

export default (api) => {
  api.cache(true);
  return {
    babelrcRoots: ['.'],
    ignore: [/node_modules/],
    sourceType,
    env,
    plugins,
  };
};
