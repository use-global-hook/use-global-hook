// can be only one for entire window
let devToolsConnector;

const defaultOptions = {
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    export: true, // export history of actions in a file
    import: 'custom', // import history of actions from a file
    jump: true, // jump back and forth (time travelling)

    skip: false, // Cannot skip for we cannot replay.
    reorder: false, // Cannot skip for we cannot replay.
    persist: false, // Avoid trying persistence.
    dispatch: false,
    test: false,
  }
}

const devToolsAvailable = typeof window === 'object'
  && !!window.__REDUX_DEVTOOLS_EXTENSION__;

const isObject = (value) => Object.prototype.toString.call(value).slice(8, -1) === 'Object';

export const connectDevTools = (options) => {
  if (!devToolsAvailable || !options) {
    return;
  }

  const mergedOptions = !isObject(options) ? defaultOptions : {
    ...options,
    features: {
      ...defaultOptions.features,
      ...options.features,
    }
  };

  devToolsConnector = devToolsConnector
    || window.__REDUX_DEVTOOLS_EXTENSION__.connect(mergedOptions);

  return devToolsConnector;
};
