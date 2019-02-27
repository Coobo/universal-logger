const winston = require('winston');
const levels = require('./levels.json');
const { format } = winston;
const { combine, label, json, timestamp, printf, colorize, simple } = format;

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

const noColorsConsole = () =>
  printf((info) => {
    let normalizedInfo = Object.assign({}, info, {
      level: undefined,
      message: undefined,
      splat: undefined,
      label: undefined,
      timestamp: undefined
    });

    return `${`(${info.label}) - `}${info.timestamp} ${info.level}: ${
      info.message
    }${Object.keys(normalizedInfo)
      .filter((key) => typeof normalizedInfo[key] !== 'undefined')
      .map(
        (key) =>
          `${`${key}: `}${
            typeof normalizedInfo[key] === 'object'
              ? JSON.stringify(normalizedInfo[key])
              : normalizedInfo[key]
          }`
      )
      .join(', ')}`;
  });

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
      transports: ['console'],
      format: combine(label({ label: 'SQL' }), ...consoleFormat) //combine(label({ label: 'SQL' }), json())
    }
  ],
  staging: [
    {
      name: 'app',
      levels: levels.app,
      minLevel: 'debug',
      transports: [
        'console',
        {
          name: 'rotate',
          options: {
            dirname: '/coobo/logs/app',
            format: combine(label({ label: 'APP' }), timestamp(), json())
          }
        }
      ],
      format: combine(
        label({ label: 'APP' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        noColorsConsole()
      ) //combine(label({ label: 'PROCESS' }), json())
    },
    {
      name: 'api',
      levels: levels.api,
      minLevel: 'OPTIONS',
      transports: [
        'console',
        {
          name: 'rotate',
          options: {
            dirname: '/coobo/logs/api',
            format: combine(label({ label: 'API' }), timestamp(), json())
          }
        }
      ],
      format: combine(
        label({ label: 'API' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        noColorsConsole()
      ) //combine(label({ label: 'PROCESS' }), json())
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
            dirname: '/coobo/logs/sql',
            format: combine(label({ label: 'SQL' }), timestamp(), json())
          }
        }
      ],
      format: combine(
        label({ label: 'SQL' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        noColorsConsole()
      ) //combine(label({ label: 'PROCESS' }), json())
    }
  ],
  production: [
    {
      name: 'app',
      levels: levels.app,
      minLevel: 'debug',
      transports: [
        'console',
        {
          name: 'rotate',
          options: {
            dirname: '/coobo/logs/app',
            format: combine(label({ label: 'APP' }), timestamp(), json())
          }
        }
      ],
      format: combine(
        label({ label: 'APP' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        simple()
      ) //combine(label({ label: 'PROCESS' }), json())
    },
    {
      name: 'api',
      levels: levels.api,
      minLevel: 'OPTIONS',
      transports: [
        'console',
        {
          name: 'rotate',
          options: {
            dirname: '/coobo/logs/api',
            format: combine(label({ label: 'API' }), timestamp(), json())
          }
        }
      ],
      format: combine(
        label({ label: 'API' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        simple()
      ) //combine(label({ label: 'PROCESS' }), json())
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
            dirname: '/coobo/logs/sql',
            format: combine(label({ label: 'SQL' }), timestamp(), json())
          }
        }
      ],
      format: combine(
        label({ label: 'SQL' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        simple()
      ) //combine(label({ label: 'PROCESS' }), json())
    }
  ],
  testing: [
    {
      name: 'app',
      levels: levels.app,
      minLevel: 'silly',
      transports: [],
      format: label({ label: 'APP' }),
      ...consoleFormat //combine(label({ label: 'PROCESS' }), json())
    },
    {
      name: 'api',
      levels: levels.api,
      minLevel: 'OPTIONS',
      transports: [],
      format: label({ label: 'API' }),
      ...consoleFormat //combine(label({ label: 'API' }), json())
    },
    {
      name: 'sql',
      levels: levels.sql,
      minLevel: 'SELECT',
      transports: [],
      format: label({ label: 'SQL' }) //combine(label({ label: 'SQL' }), json())
    }
  ]
};
