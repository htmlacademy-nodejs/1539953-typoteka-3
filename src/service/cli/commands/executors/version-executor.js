'use strict';

const packageJsonFile = require(`../../../../../package.json`);
const {Config} = require(`../../assets/config`);

const versionExecutor = () => {
  const version = packageJsonFile.version;
  console.info(`v${version}`);

  process.exit(Config.Codes.SUCCESS);
};

module.exports = {versionExecutor};
