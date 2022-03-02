exports.seed = function(knex) {
  return knex('classes').del()
    .then(function () {
      return knex('classes').insert([
        { class_id: 1, 
          class_name: 'test class',
          class_type: 'cardio',
          class_category: 'RIPPED',
          start_time: '2022-03-01 10:00:00', //YYYY-mm-dd HH:ii:ss
          duration: '30',
          curr_attendees: '0',
          max_attendees: '10',
          level: '3',
          location: 'Main studio',
        },
        
      ]);
    });
};
