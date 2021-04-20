const { signToken, decodeToken } = require('../../common/helpers/jwt');
const jwt = require('jsonwebtoken');
const { createRecaptcha } = require('../../common/helpers/recaptcha');
const recaptchaService = require('./index.service');
const { HTTPException } = require('../../common/helpers/errorHandler');

const getCaptcha = async (req, res, next) => {
  try {
    const { url, text } = createRecaptcha(300, 150);
    const ip = req.ip ? req.ip : 'unknown';
    const device = await recaptchaService.saveDevice(ip);
    const recaptcha = await recaptchaService.saveRecaptcha(device.uid, text);
    return res.json({
      status: "success",
      statusCode: 200,
      data: {
        ip,
        recaptcha_uid: recaptcha.uid,
        device_uid: device.uid,
        recaptcha: url,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const solveCaptcha = async (req, res, next) => {
  try {
    const { device_uid, recaptcha_uid, result } = req.body;
    const recaptcha = await recaptchaService.solveRecaptcha(device_uid, recaptcha_uid, result);
    const trustToken = signToken(JSON.parse(JSON.stringify(recaptcha)));
    return res.json({
      status: "success",
      statusCode: 200,
      data: {
        trustToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const validateCaptcha = (req, res, next) => {
  try {
    const trustToken= req.headers['trust-token'];
    if(!trustToken) {
      throw new HTTPException(400, "No trust token found");
    }
    const decoded = decodeToken(trustToken);
    return res.json({ 
      status: "success",
      statusCode: 200,
      data: {
        uid: decoded.uid,
        device_uid: decoded.device_uid,
        result: true,
      }
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.json({ 
        status: "error",
        statusCode: 400,
        message: "Verification failed. Trust token expired",
        data: {
          result: false,
        }
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.json({ 
        status: "error",
        statusCode: 400,
        message: "Verification failed. Trust token malformed",
        data: {
          result: false,
        }
      });
    }
    if (error instanceof HTTPException) {
      return next(error);
    }
    return res.json({ 
      status: "error",
      statusCode: 400,
      message: "Verification failed. Please try again.",
      data: {
        result: false,
      }
    });
  }
};
module.exports = {
  getCaptcha,
  solveCaptcha,
  validateCaptcha,
};