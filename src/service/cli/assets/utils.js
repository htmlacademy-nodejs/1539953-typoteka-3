'use strict';

// Returns random integer from specified range
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns array shuffled with Fisher-Yates algorithm
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

// Returns object with user command and arguments parsed from parameters
const parseRuntimeParameters = () => {
  const USER_ARGV_INDEX = 2;
  const params = process.argv.slice(USER_ARGV_INDEX);

  if (params.length > 0) {
    // First element of params is name of command. From second element - command args
    const [userCommand] = params;
    const userArgs = params.slice(1);

    return {
      command: userCommand,
      args: userArgs
    };
  }

  // Returns empty data on empty params array
  return {
    command: ``,
    args: []
  };
};

module.exports = {getRandomInt, shuffle, parseRuntimeParameters};
