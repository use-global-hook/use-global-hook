export const presets = ['@babel/preset-env', '@babel/preset-react'];

export const sourceType = 'unambiguous';

export const envPlugins = {
  development: ['@babel/transform-runtime'],
  production: ['@babel/transform-runtime'],
  test: ['@babel/transform-runtime']
};

export const env = {
  development: {
    presets,
    plugins: envPlugins.development
  },
  production: {
    presets,
    plugins: envPlugins.production
  },
  test: {
    presets,
    plugins: envPlugins.test
  }
};

export const plugins = [];
