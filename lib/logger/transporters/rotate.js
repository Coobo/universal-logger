const winston = require('winston');

require('winston-daily-rotate-file');

const defaultOptions = {
  frequency: null, // Rely on datePattern to rotate files
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  filename: process.env.APP_NAME
    ? process.env.APP_NAME.replace(
        /["<>|:*?\\/\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f]/g,
        '-'
      )
    : 'applog',
  dirname: '/coobo/logs/'
};

module.exports = (options = {}) =>
  new winston.transports.DailyRotateFile(
    Object.assign({}, defaultOptions, options)
  );
