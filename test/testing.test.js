process.env.APP_NAME = '!@#$%¨&*()_+=-´`[]~^}{/?°ºª;:.,<>¹²³£¢¬\\|"\'';
process.env.NODE_ENV = 'testing';

console.log(`\n\n\nStarting test on ${process.env.NODE_ENV} environment`);

const logger = require('./../');

console.log('Logger env:', logger.env, 'should be', process.env.NODE_ENV);

console.log('Available Methods:', logger.availableLevels, '\n\n');
const { app, api, sql } = logger;

for (let log of [app, sql, api]) {
  for (let level in log.levels) {
    try {
      log[level](`Trying to log on ${level} level`);
    } catch (e) {
      throw new Error(
        `Failed attempting ${level} method on logger inside ${env} environment.`
      );
    }
  }
}
