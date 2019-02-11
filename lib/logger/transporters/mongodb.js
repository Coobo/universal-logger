const winston = require('winston');
const yn = require('yn');

require('winston-mongodb');

/**
 * This module will only resolve if the proper mongodb connection parameters are set on the env.
 *
 * Otherwise, it will throw an Error.
 */
if (
  !process.env.MONGODB_USERNAME ||
  !process.env.MONGODB_PASSWORD ||
  !process.env.MONGODB_HOST ||
  !process.env.MONGODB_PORT ||
  !process.env.MONGODB_DATABASE ||
  !process.env.MONGODB_AUTH ||
  !process.env.MONGODB_AUTHSOURCE
)
  throw new Error(
    'Attempted to call MongoDB transporter without providing the necessary MONGODB credentials'
  );

const db = `mongodb://${process.env.MONGODB_USERNAME}:${
  process.env.MONGODB_PASSWORD
}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${
  process.env.MONGODB_DATABASE
}${
  yn(process.env.MONGODB_AUTH)
    ? `?authSource=${process.env.MONGODB_AUTHSOURCE}`
    : ''
}`;

const config = require('./../../config')[process.env.NODE_ENV];

const defaultOptions = {
  db,
  level: config.minLevel,
  options: {
    poolSize: 3,
    autoReconnect: true
  },
  collection: 'spendfy_log',
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  expireAfterSeconds: 604800 // Expiring after one week
};

module.exports = (options = {}) =>
  new winston.transports.MongoDB(Object.assign({}, defaultOptions, options));
