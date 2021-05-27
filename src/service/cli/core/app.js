'use strict';

const {Commands} = require(`../commands`);
const {CommandsRegister} = require(`./commands-register`);
const {parseRuntimeParameters} = require(`../assets/utils`);

const DEFAULT_COMMAND = `--help`;

class App {
  static start() {
    // Get user's command with arguments
    const {command, args} = parseRuntimeParameters();

    // Saves commands register instance to property of App class to provide it as commands parameter
    App.commandsRegister = new CommandsRegister();
    // Add commands to register first of all
    App.commandsRegister.addEach(Commands);

    // Does the command is specified with correct prefix
    const isCommand = App._isCommand(command);
    // Does the command is even exists
    const isCommandExists = App.commandsRegister.isCommandExists(command);
    // Should app to use default command if command specified by user is not correct
    const targetCommand = (isCommand && isCommandExists) ? command : DEFAULT_COMMAND;

    // Get target command and execute it with specified params
    const invokedCommand = App.commandsRegister.getCommandByName(targetCommand);
    invokedCommand.execute(App, args);
  }

  // Returns boolean status that command starts with command prefix
  static _isCommand(str) {
    return str.startsWith(App.commandsRegister.prefix);
  }
}

module.exports = {App};
