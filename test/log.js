process.env.APP_NAME = '!@#$%¨&*()_+=-´`[]~^}{/?°ºª;:.,<>¹²³£¢¬\\|"\'';

const logger = require('./../');

// console.log('env', logger.env);
// console.log('config', logger.config);
// console.log('version', logger.version);
// console.log('available loggers', logger.availableLoggers);
console.log('Available Methods:', logger.availableLevels, '\n\n');
const { app, api, sql } = logger;

console.log('Starting to test all levels on every log type');
for (let log of [app, sql, api]) {
  for (let level in log.levels) {
    try {
      log[level](`Trying to log on ${level} level`);
    } catch (e) {
      throw new Error(`Failed attempting ${level} method on logger`);
    }
  }
}
