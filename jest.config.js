const toNotIgnore = {
  modules: [].join('|'),
};

const toExport = {
  roots: ['<rootDir>'],
  transformIgnorePatterns: ['node_modules', '/<rootDir>/lib', '/<rootDir>/(?!src)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/node_modules/@znemz/react-extras-jest/lib/assetsTransformer.js',
    '\\.(css|less|pcss)(!js)$':
      '<rootDir>/node_modules/@znemz/react-extras-jest/lib/assetsTransformer.js',
  },
  setupFilesAfterEnv: ['<rootDir>/node_modules/@znemz/react-extras-jest/lib/setup.js'],
  verbose: true,
};

if (toNotIgnore.modules.length) {
  toExport.transformIgnorePatterns.push(`/node_modules/(?!(${toNotIgnore.modules}))`);
}

module.exports = toExport;
