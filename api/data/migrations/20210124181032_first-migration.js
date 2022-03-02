exports.up = knex => {
  return knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 64).notNullable()
      users.string('password', 64).notNullable()
      users.boolean('isInstructor').defaultTo(0)
      // users.timestamps(true, true)
    })
    .createTable('classes', (classes) => {
      classes.increments('class_id')
      classes.string('class_name', 64).notNullable()
      classes.string('class_type', 64).notNullable()
      classes.string('class_category', 64)
      classes.dateTime('start_time').notNullable()
      classes.integer('duration', 64).notNullable()
      classes.integer('curr_attendees', 64).notNullable()
      classes.integer('max_attendees', 64).notNullable()
      classes.integer('level').notNullable()
      classes.string('location', 64).notNullable()   
    })
    .createTable('attendees', (attendees) => {
      attendees.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
      attendees.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
      attendees.primary(['user_id', 'class_id'])
    })    
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('attendees')
    .dropTableIfExists('users')
    .dropTableIfExists('classes')
}
