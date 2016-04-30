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
      host: 'db',
      port: '5432',
      database: 'laws',
      user: 'docker',
      password: 'ts3qdf',
      prefix: '',
      encoding: 'utf8'
    }
  }
};