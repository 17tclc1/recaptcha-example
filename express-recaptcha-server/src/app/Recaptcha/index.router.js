const { isNotEmpty } = require('../../common/filters/validation');
const { limiter } = require('../../common/helpers/rateLimit');
const { routerGroup } = require('../../common/helpers/routerGroup');
const { getCaptcha, validateCaptcha, solveCaptcha } = require('./index.controller');

module.exports = routerGroup({
  name: 'recaptcha',
  prefix: '/recaptcha',
},
[
  {
    method: 'get',
    path: '/',
    handlers: [limiter, getCaptcha] 
  },
  {
    method: 'post',
    path: '/solve',
    handlers: [
      limiter,
      isNotEmpty('device_uid'),
      isNotEmpty('recaptcha_uid'),
      isNotEmpty('result'),
      solveCaptcha
    ],
  },
  { 
    method: 'post',
    path: '/validate',
    handlers: [
      limiter,
      validateCaptcha
    ] 
  },
]);
