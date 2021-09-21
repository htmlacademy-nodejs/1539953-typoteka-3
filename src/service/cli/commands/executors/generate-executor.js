'use strict';

const {Config} = require(`../../assets/config`);
const {getRandomInt, shuffle, readFile, writeFile} = require(`../../assets/utils`);

// Returns record title
const getTitle = (titles) => {
  return titles[getRandomInt(0, titles.length - 1)];
};

// Returns random count of shuffled text sentences from specified source
const getRandomTextSentences = (textSource, minCount, maxCount) => {
  const sentencesCount = getRandomInt(minCount, maxCount);
  const shuffledSentences = shuffle(textSource);

  return shuffledSentences.slice(0, sentencesCount).join(` `);
};

// Returns random count of announce sentences for publication
const getAnnounce = (textSentences) => {
  return getRandomTextSentences(textSentences, Config.MIN_ANNOUNCE_LENGTH, Config.MAX_ANNOUNCE_LENGTH);
};

// Returns random count of text sentences for publication
const getText = (textSentences) => {
  const MIN_TEXT_SENTENCES_COUNT = 1;
  const MAX_TEXT_SENTENCES_COUNT = textSentences.length - 1;

  return getRandomTextSentences(textSentences, MIN_TEXT_SENTENCES_COUNT, MAX_TEXT_SENTENCES_COUNT);
};

// Returns DateTime segment handled with padStart
const handleDateTimeSegment = (segment) => {
  return segment.toString().padStart(2, `0`);
};

// Returns date in format of [yyyy.MM.dd HH:mm:ss]
const formatDateTime = (dateTime) => {
  // Get Date segments
  const year = dateTime.getFullYear();
  const month = handleDateTimeSegment(dateTime.getMonth());
  const day = handleDateTimeSegment(dateTime.getDay());

  // Get Time segments
  const hours = handleDateTimeSegment(dateTime.getHours());
  const minutes = handleDateTimeSegment(dateTime.getMinutes());
  const seconds = handleDateTimeSegment(dateTime.getSeconds());

  // Concat segments of each part
  const date = [year, month, day].join(`-`);
  const time = [hours, minutes, seconds].join(`:`);

  return `${date} ${time}`;
};

// Returns random publication date
const getRandomDateTime = () => {
  const currentDate = new Date();

  // Get two date edges that depends on specified maximum month ago value
  const newestDateTimeEdge = Number(currentDate);
  // Here oldestDateEdge is already have number type
  const oldestDateTimeEdge = currentDate.setMonth(currentDate.getMonth() - Config.DateMaxMonthsAgo);

  // Get random timestamp
  const randomTimestamp = getRandomInt(oldestDateTimeEdge, newestDateTimeEdge);
  const randomDateTime = new Date(randomTimestamp);

  // Returns formatted date
  return formatDateTime(randomDateTime);
};

// Returns random publication categories array
const getCategories = (categories) => {
  const MIN_CATEGORIES_COUNT = 1;
  const MAX_CATEGORIES_COUNT = categories.length - 1;

  const categoriesCount = getRandomInt(MIN_CATEGORIES_COUNT, MAX_CATEGORIES_COUNT);
  const shuffledCategories = shuffle(categories);

  return shuffledCategories.slice(0, categoriesCount);
};

// Returns generated publications data
const generateExecutor = async (count) => {
  // Read data from files once
  const [titles, sentences, categories] = await Promise.all([
    readFile(Config.Paths.TITLES),
    readFile(Config.Paths.SENTENCES),
    readFile(Config.Paths.CATEGORIES)
  ]);

  // Creates specified count of empty objects and fills it with data
  const data = Array(count).fill({}).map(() => {
    return {
      title: getTitle(titles),
      announce: getAnnounce(sentences),
      fullText: getText(sentences),
      createdDate: getRandomDateTime(),
      category: getCategories(categories)
    };
  });

  // Create JsonResult and write it to result file
  const jsonData = JSON.stringify(data);
  await writeFile(Config.FILE_NAME, jsonData);
};

module.exports = {generateExecutor};
