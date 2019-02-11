const winston = require('winston');
const levels = require('./levels.json');
const { format } = winston;
const { combine, label, json, timestamp, printf, colorize } = format;

const addColorGenerator = (info, colorizer) => (text) =>
  colorizer.colorize(info[Symbol.for('level')], info.level, text);

const consoleFormat = [
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  (() => {
    const colorizer = winston.format.colorize();
    return printf((info) => {
      const normalizedInfo = Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined,
        label: undefined,
        timestamp: undefined
      });

      const addColor = addColorGenerator(info, colorizer);

      let stringifiedRest = Object.keys(normalizedInfo)
        .filter((key) => typeof normalizedInfo[key] !== 'undefined')
        .map(
          (key) =>
            `${addColor(`${key}: `)}${
              typeof normalizedInfo[key] === 'object'
                ? JSON.stringify(normalizedInfo[key])
                : normalizedInfo[key]
            }`
        )
        .join(', ');

      stringifiedRest =
        stringifiedRest !== '{}' && stringifiedRest.length > 0
          ? ` [ ${stringifiedRest} ]`
          : '';

      return `${addColor(`(${info.label}) - `)}${addColor(
        info.timestamp
      )} ${addColor(info.level)}: ${info.message}${stringifiedRest}`;
    });
  })()
];

module.exports = {
  development: [
    {
      name: 'app',
      levels: levels.app,
      minLevel: 'silly',
      transports: ['console'],
      format: combine(label({ label: 'APP' }), ...consoleFormat) //combine(label({ label: 'PROCESS' }), json())
    },
    {
      name: 'api',
      levels: levels.api,
      minLevel: 'OPTIONS',
      transports: ['console'],
      format: combine(label({ label: 'API' }), ...consoleFormat) //combine(label({ label: 'API' }), json())
    },
    {
      name: 'sql',
      levels: levels.sql,
      minLevel: 'SELECT',
      transports: [
        'console',
        {
          name: 'rotate',
          options: {
            dirname: './logs/',
            format: combine(timestamp(), json())
          }
        }
      ],
      format: combine(label({ label: 'SQL' }), ...consoleFormat) //combine(label({ label: 'SQL' }), json())
    }
  ],
  staging: [
    { name: 'process', levels: {}, minLevel: 'silly' },
    { name: 'api', levels: {}, minLevel: 'silly' },
    { name: 'sql', levels: {}, minLevel: 'silly' }
  ],
  production: [
    { name: 'process', levels: {}, minLevel: 'silly' },
    { name: 'api', levels: {}, minLevel: 'silly' },
    { name: 'sql', levels: {}, minLevel: 'silly' }
  ]
};
