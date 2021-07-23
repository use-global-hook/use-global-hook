import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const input = "./src";
const globals = {
  'react': 'React'
};
const commonjsOptions = {
  include: /node_modules/,
};
const umdBabelOptions = {
  exclude: /node_modules/,
  babelHelpers: "runtime",
  presets: [
    ["@babel/preset-env", { modules: false }],
  ],
  plugins: [
    ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
    "@babel/plugin-transform-object-assign", // for IE 11 support
    ["@babel/plugin-transform-runtime", { useESModules: true }],
  ],
};

function onwarn(warning) {
  console.warn(warning.message);
}

export default [
  // CommonJS
  {
    input,
    onwarn,
    output: {
      dir: "build/cjs",
      format: "cjs",
      globals,
      preserveModules: true,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { modules: false }],
        ],
        plugins: [
          ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
          "@babel/plugin-transform-object-assign", // for IE 11 support
        ],
      }),
      commonjs(commonjsOptions),
      replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
    ],
  },
  // ES Modules
  {
    input,
    onwarn,
    output: {
      dir: "build/esm",
      format: "esm",
      globals,
      preserveModules: true,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel({
        exclude: /node_modules/,
        babelHelpers: "bundled",
      }),
      replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
    ],
  },
  // UMD Development
  {
    input,
    onwarn,
    output: {
      file: "build/umd/use-global-hook.js",
      format: "umd",
      name: "UseGlobalHook",
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(umdBabelOptions),
      commonjs(commonjsOptions),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
    ],
  },
  // UMD Production
  {
    input,
    onwarn,
    output: {
      file: "build/umd/use-global-hook.min.js",
      format: "umd",
      name: "UseGlobalHook",
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(umdBabelOptions),
      commonjs(commonjsOptions),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser(),
    ],
  },
];
