const bcrypt = require('bcrypt');

const dbConfig = require('./knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.model('User', {
  tableName: 'users',
  hidden: ['password'],
  async checkPassword(pw) {
    return await bcrypt.compare(pw, this.get("password"));
  }
});

module.exports = {
  User
};
