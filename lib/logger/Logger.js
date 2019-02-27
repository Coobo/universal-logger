const config = require('./../config')[process.env.NODE_ENV];
const winston = require('winston');

function getTransport(transport = 'console', options = {}) {
  if (transport === 'console')
    return new winston.transports.Console({
      silent: process.env.NODE_ENV === 'testing'
    });
  if (transport === 'rotate') return require('./transporters/rotate')(options);
}

let loggers = [];

for (let loggerConfig of config) {
  winston.loggers.add(loggerConfig.name, {
    levels: loggerConfig.levels.levels,
    level: loggerConfig.minLevel,
    format: loggerConfig.format,
    name: loggerConfig.name,
    transports: loggerConfig.transports
      ? loggerConfig.transports.map((transport) => {
          if (typeof transport === 'string') return getTransport(transport);
          else return getTransport(transport.name, transport.options);
        })
      : []
  });
  winston.addColors(loggerConfig.levels.colors);
  loggers.push(loggerConfig.name);
}

exports.availableLoggers = loggers;
exports.winston = winston;
