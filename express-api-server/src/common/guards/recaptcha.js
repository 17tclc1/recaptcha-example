const axios = require('axios');
const { RECAPTCHA_SERVER_URL } = require('../env/env');

const isRecaptchaValid = () => async (req, res, next) => {
  try {
    const response = await axios.post(`${RECAPTCHA_SERVER_URL}/validate`, {
      trustToken: req.body.trustToken,
    });
    if (!response.data.data.result) {
      return res.json({
        status: 'error',
        code: 400,
        message: response.data.message,
      });
    }
    return next();
  } catch (error) {
    if (error.response && error.response.data.message) {
      return res.json({
        status: 'error',
        code: 400,
        message: error.response.data.message,
      });
    }
    return next(error);
  }
};

module.exports = {
  isRecaptchaValid,
};
