export const setupOptions = (store, options = {}) => {
  //Backward compatibility with 0.1.2
  if (options instanceof Function) {
    options(store);
    return;
  }

  const { initializer, plugins = [] } = options;
  plugins.forEach((plugin) => {
    plugins(store);
  });
  initializer && initializer(store);
};
