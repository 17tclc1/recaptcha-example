const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(async () => {
      const password = await bcrypt.hash('123456', 10);
      return knex('users').insert({
        email: 'quangtudng@gmail.com',
        name: 'quangtudng',
        password,
      });
    });
};
