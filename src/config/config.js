
// Dynamic environment-based configuration loader
// src/config/config.js
let config;

if (process.env.REACT_APP_CONFIG_ENV === 'production') {
  config = require('./config.production.json');
} else {
  config = require('./config.dev.json');
}

export default config;

  