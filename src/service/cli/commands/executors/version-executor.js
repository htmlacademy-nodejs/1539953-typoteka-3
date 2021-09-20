'use strict';

const packageJsonFile = require(`../../../../../package.json`);
const {Config} = require(`../../assets/config`);
const chalk = require(`chalk`);

const versionExecutor = () => {
  const version = packageJsonFile.version;
  console.info(chalk.blue(`v${version}`));

  process.exit(Config.Codes.SUCCESS);
};

module.exports = {versionExecutor};
