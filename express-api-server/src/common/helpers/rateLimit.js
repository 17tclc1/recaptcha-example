const rateLimit = require('express-rate-limit');
const {
  RATE_LIMITER_RESET_TIMEOUT,
  RATE_LIMITER_MAX_REQUEST,
} = require('../env/env');

const limiter = rateLimit({
  windowMs: RATE_LIMITER_RESET_TIMEOUT,
  max: RATE_LIMITER_MAX_REQUEST, // start blocking after 5 requests
  message: {
    status: 'error',
    statusCode: 429,
    message:
      'Too many requests have been received from the same public IP address, please try again in 10 seconds',
  },
});

module.exports = {
  limiter,
};
