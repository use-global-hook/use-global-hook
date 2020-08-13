export const immerAction = (store, originalFunction) => (...args) => {
  const result = originalFunction(...args);
  if (typeof result === "function") store.setState(result);
};
