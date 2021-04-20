require('dotenv').config({ path: `${__dirname}/../../../.env` });

module.exports = {
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  RECAPTCHA_SERVER_URL: process.env.RECAPTCHA_SERVER_URL,
  NODE_ENV: process.env.NODE_ENV,
};
