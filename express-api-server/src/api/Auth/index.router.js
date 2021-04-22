const { isNotEmpty, isEmail } = require('../../common/filters/validation');
const { isRecaptchaValid } = require('../../common/guards/recaptcha');
const { routerGroup } = require('../../common/helpers/routerGroup');
const { login, register } = require('./index.controller');
const { limiter } = require('../../common/helpers/rateLimit');

module.exports = routerGroup(
  {
    name: 'auth',
    prefix: '/auth',
  },
  [
    {
      method: 'post',
      path: '/login',
      handlers: [
        limiter,
        isNotEmpty('trustToken'),
        isNotEmpty('email'),
        isEmail('email'),
        isNotEmpty('password'),
        isRecaptchaValid(),
        login,
      ],
    },
    {
      method: 'post',
      path: '/register',
      handlers: [
        limiter,
        isNotEmpty('trustToken'),
        isNotEmpty('email'),
        isEmail('email'),
        isNotEmpty('password'),
        isRecaptchaValid(),
        register,
      ],
    },
  ]
);
