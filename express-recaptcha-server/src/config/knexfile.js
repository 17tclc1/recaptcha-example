const { DB_TYPE, DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = require("../common/env/env");

module.exports = {
  development: {
    client: DB_TYPE,
    connection: {
      host : DB_HOST,
      user : DB_USER,
      database : DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/../database/migrations',
    },
    seeds: {
      directory: __dirname + '/../database/seeds'
    }
  }
};