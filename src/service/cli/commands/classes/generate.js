'use strict';

const {Command} = require(`../../core/command`);
const {Config} = require(`../../assets/config`);

// Main cli app command that generates mocks data
class GenerateCommand extends Command {
  constructor(executor) {
    super();

    this._name = `generate`;
    this._description = `формирует файл mocks.json`;
    this._params = [`count`];
    this._executor = executor;
  }

  execute(app, args) {
    const defaultCountValue = Config.PublicationsCount.DEFAULT;
    const maxCountValue = Config.PublicationsCount.MAX;

    // Get target mocks data count from specified command parameter. Single record by default
    const specifiedPublicationsCount = (args.length > 0) ? parseInt(args[0], 10) : defaultCountValue;
    // Validate on Not A Number after parseInt from string
    const publicationsCount = isNaN(specifiedPublicationsCount) ? defaultCountValue : Math.abs(specifiedPublicationsCount);

    // If user specified more than 1000 publications break execution with error code
    if (publicationsCount > maxCountValue) {
      console.error(`Не больше ${maxCountValue} публикаций`);
      process.exit(Config.Codes.ERROR);
    }

    // Run command executor. It is dependency injection for hot swap to test generator, for example
    this._executor(publicationsCount);
  }
}

module.exports = {GenerateCommand};
