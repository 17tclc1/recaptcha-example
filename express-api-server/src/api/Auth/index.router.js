const { isNotEmpty, isEmail } = require('../../common/filters/validation');
const { isRecaptchaValid } = require('../../common/guards/recaptcha');
const { routerGroup } = require('../../common/helpers/routerGroup');
const { login } = require('./index.controller');

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
        isNotEmpty('trustToken'),
        isNotEmpty('email'),
        isEmail('email'),
        isNotEmpty('password'),
        isRecaptchaValid(),
        login,
      ],
    },
  ]
);
