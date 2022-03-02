exports.seed = function(knex) {
  return knex('attendees').del()
    .then(function () {
      return knex('attendees').insert([
        {user_id: 1, class_id: 1},
        {user_id: 2, class_id: 1},
        {user_id: 3, class_id: 1}
      ]);
    });
};
