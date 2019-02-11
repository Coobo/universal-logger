# universal-logger

Universal Logging module for spendfy's services

## Use Case

```js
import { SystemLogger, APILogger, SQLLogger } from '@coobo/spendfy-logger';
```

## Levels

```json
// System
{
  "levels": {
    "error": 0,
    "warn": 1,
    "info": 2,
    "verbose": 3,
    "debug": 4,
    "silly": 5
  },
  "colors": {
    "error": "red",
    "warn": "yellow",
    "info": "green",
    "verbose": "cyan",
    "debug": "blue",
    "silly": "magenta"
  }
}
// API
{
  "levels": {
    "DELETE": 0,
    "PATCH": 1,
    "PUT": 2,
    "POST": 3,
    "GET": 4,
    "OPTIONS": 5
  },
  "colors": {
    "DELETE": "red",
    "PATCH": "cyan",
    "PUT": "blue",
    "POST": "yellow",
    "GET": "green",
    "OPTIONS": "black"
  }
}
// SQL
{
  "levels": {
    "DELETE": 0,
    "UPDATE": 1,
    "INSERT": 2,
    "SELECT": 3
  },
  "colors": {
    "DELETE": "red",
    "UPDATE": "magenta",
    "INSERT": "green",
    "SELECT": "cyan"
  }
}
```
