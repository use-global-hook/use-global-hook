const fs = require("fs");
const path = require("path");
const glob = require("glob");

const packagePath = process.cwd();
const buildPath = path.join(packagePath, "./build");
const srcPath = path.join(packagePath, "./src/core");

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);

  if (fs.existsSync(sourcePath)) {
    const targetPath = path.resolve(buildPath, path.basename(file));

    await fs.copyFileSync(sourcePath, targetPath);

    console.log(`Copied ${sourcePath} to ${targetPath}`);
  }
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports are tree-shakeable.
 *
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob.sync("*/index.js", { cwd: from }).map(path.dirname);

  await Promise.all(
    directoryPackages.map(async directoryPackage => {
      const packageJson = {
        sideEffects: false,
        module: path.join("../esm", directoryPackage, "index.js"),
      };
      const packageJsonPath = path.join(to, directoryPackage, "package.json");

      await fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));

      return packageJsonPath;
    }),
  );
}

async function createPackageFile() {
  const packageData = await fs.readFileSync(path.resolve(packagePath, "./package.json"), "utf8");
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: "./cjs/index.js",
    module: "./esm/index.js",
  };
  const targetPath = path.resolve(buildPath, "./package.json");

  await fs.writeFileSync(targetPath, JSON.stringify(newPackageData, null, 4), "utf8");
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fs.readFileSync(file, "utf8");
  await fs.writeFileSync(file, string + data, "utf8");
}

async function addLicense(packageData) {
  const license = `/** @license UseGlobalHook v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 */
`;
  await Promise.all(
    [
      "./cjs/index.js",
      "./esm/index.js",
      "./umd/use-global-hook.js",
      "./umd/use-global-hook.min.js",
    ].map(async file => {
      try {
        await prepend(path.resolve(buildPath, file), license);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(`Skipped license for ${file}`);
        } else {
          throw err;
        }
      }
    }),
  );
}

async function run() {
  try {
    const packageData = await createPackageFile();

    await Promise.all(
      [
        "./README.md",
        "./CHANGELOG.md",
        "./LICENSE.md",
      ].map(file => includeFileInBuild(file)),
    );

    await addLicense(packageData);

    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
