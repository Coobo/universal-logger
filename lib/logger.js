if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const Logger = require('./logger/Logger');

const expressLogger = require('express-winston');

const logger = exports;

logger.version = require('../package.json').version;

logger.env = process.env.NODE_ENV;

logger.config = require('./config/')[process.env.NODE_ENV];

logger.availableLoggers = Logger.availableLoggers;

logger.availableMethods = logger.availableLevels = Logger.availableLoggers.reduce(
  (levels, loggerName) => {
    levels[loggerName] = Object.keys(
      Logger.winston.loggers.get(loggerName).levels
    );
    return levels;
  },
  {}
);

logger.winston = Logger.winston;

for (let loggerName of Logger.availableLoggers) {
  logger[loggerName] = Logger.winston.loggers.get(loggerName);
}

logger.expressLogger = expressLogger;
