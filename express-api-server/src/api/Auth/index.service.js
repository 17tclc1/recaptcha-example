const knex = require('../../config/connection');

const getOneByEmail = (email) => knex('users').where({ email }).first('*');
const createOne = async (payload) => knex('users').insert(payload);
const getOneById = (id) => knex('users').where({ id }).first('*');
module.exports = {
  getOneByEmail,
  createOne,
  getOneById,
};
