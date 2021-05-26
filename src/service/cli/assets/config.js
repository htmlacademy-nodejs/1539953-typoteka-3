'use strict';

const Config = {
  Codes: {
    ERROR: 1,
    SUCCESS: 0
  },
  // Value of publications date max months ago
  DateMaxMonthsAgo: 3,
  // Range of elements count in result file
  PublicationsCount: {
    DEFAULT: 1,
    MIN: 1,
    MAX: 1000
  },
  // Min count of sentences in announce
  MIN_ANNOUNCE_LENGTH: 1,
  // Max count of sentences in announce
  MAX_ANNOUNCE_LENGTH: 5,
  // Output file name
  FILE_NAME: `mocks.json`
};

module.exports = {Config};
