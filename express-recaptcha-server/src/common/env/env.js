require('dotenv').config({ path: __dirname + '/../../../.env' });

module.exports = {
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT,
  RATE_LIMITER_RESET_TIMEOUT: process.env.RATE_LIMITER_RESET_TIMEOUT,
  RATE_LIMITER_MAX_REQUEST: process.env.RATE_LIMITER_MAX_REQUEST,
  RECAPTCHA_TIMEOUT: process.env.RECAPTCHA_TIMEOUT,
  UNSOLVED_RECAPTCHA_LIMIT: process.env.UNSOLVED_RECAPTCHA_LIMIT,
  CRONJOB_SCHEDULE: process.env.CRONJOB_SCHEDULE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE
}