'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'postgresql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: '',
      user: '',
      password: '',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    },
    postgresql: {
      host: '120.25.98.104',
      port: '5432',
      database: 'postgres',
      user: 'postgres',
      password: 'mypassword',
      prefix: '',
      encoding: 'utf8'
    }
  }
};