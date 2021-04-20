const CronJob = require('cron').CronJob;
const moment = require('moment');
const knex = require('../../config/connection');
const { RECAPTCHA_TIMEOUT, CRONJOB_SCHEDULE } = require('../env/env');
const job = new CronJob(`*/${CRONJOB_SCHEDULE} * * * * *`, async function() {
  const dueTime = moment().subtract(RECAPTCHA_TIMEOUT, 'seconds').format('YYYY-MM-DD HH:mm:ss');
  const result = await knex('recaptchas').where('created_at', '<', dueTime).del();
  console.log(`Cron job successfully ran at : ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  console.log(`Timeout recaptcha cleared    : ${result}`);
}, null, true);

module.exports = {
  job,
}