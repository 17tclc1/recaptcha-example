const environment = process.env.NODE_ENV.trim() || 'development';
const config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);
