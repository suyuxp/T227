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
      host: '192.168.99.100',
      port: '5432',
      database: 'test',
      user: 'postgres',
      password: 'mypassword',
      prefix: '',
      encoding: 'utf8'
    }
  }
};