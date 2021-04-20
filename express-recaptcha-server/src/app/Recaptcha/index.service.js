const knex = require('../../config/connection');
const { v4: genUUID } = require('uuid');
const { HTTPException } = require('../../common/helpers/errorHandler');
const { UNSOLVED_RECAPTCHA_LIMIT } = require('../../common/env/env');
const saveDevice =  async (ip) => {
  const uid = genUUID();
  // Return this device if it exists
  const device = await knex('devices').where({
    ip,
  }).first();

  if(device) {
    return device;
  }
  // Insert new device if it does not exist
  await knex('devices').insert({
    uid,
    ip,
  });
  return knex('devices').where('uid', uid).first();
}

const saveRecaptcha = async (device_uid, result) => {
  const uid = genUUID();
  // Check if this device currently has more than 5 corresponding unsolved recaptchas
  const recaptchas = await knex('recaptchas').where('device_uid', device_uid).count('uid as count');
  if(recaptchas[0].count >= UNSOLVED_RECAPTCHA_LIMIT) {
    throw new HTTPException(400, "Suspicious actions detected. Please try again in 1 minute");
  }
  await knex('recaptchas').insert({
    uid,
    device_uid,
    result,
  });
  return knex('recaptchas').where('uid', uid).first();
}
const solveRecaptcha = async (device_uid, uid, result) => {
  const recaptcha = await knex('recaptchas').where({
    device_uid,
    uid,
  }).first();
  if(!recaptcha) {
    throw new HTTPException(404, 'Resource not found. Please request new recaptcha');
  }
  const currentTime = new Date();
  const recaptchaTime = new Date(recaptcha.created_at);
  if(currentTime - recaptchaTime > 60000) {
    throw new HTTPException(400, 'Recaptcha timeout. Please request new recaptcha');
  }
  if(recaptcha.result !== result) {
    throw new HTTPException(400, 'Recaptcha result incorrect. Please request new recaptcha');
  }
  // If all the condition passes, delete the recaptcha
  await knex('recaptchas').where({
    device_uid,
    uid,
  }).del();
  return recaptcha;
}
module.exports = {
  saveDevice,
  saveRecaptcha,
  solveRecaptcha,
}
