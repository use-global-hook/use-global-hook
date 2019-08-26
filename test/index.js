export const defaultActions = {
  setState(store, newState) {
    store.setState(newState);
  }
};

export const subsetActions = {
  setA(store, a) {
    store.setState({ a });
  },
  subset: {
    setB(store, b) {
      store.setState({ subset: { b } });
    }
  }
};
