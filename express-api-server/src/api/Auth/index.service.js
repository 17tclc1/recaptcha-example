const knex = require('../../config/connection');

const getOneByEmail = (email) => knex('users').where({ email }).first('*');
module.exports = {
  getOneByEmail,
};
