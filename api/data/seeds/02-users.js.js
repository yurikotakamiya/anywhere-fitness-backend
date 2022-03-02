
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'testuser1', password: '1234'},
        {username: 'testuser2', password: '1234'},
        {username: 'testuser3', password: '1234'}
      ]);
    });
};
