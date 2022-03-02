const db = require('./../data/db-config')

const get = () => {
    return db('classes')
}

const getBy = filter => {
    return db('classes').where(filter).returning('*')
}

const getById = id => {
    return db('classes').where('class_id', id)
}

const create = classes => {
    return db('classes').insert(classes).returning('*')
}

const update = (id, changes) => {
    return db('classes').where('class_id', id).update(changes)
}

const remove = id => {
    return db('classes').where('class_id', id).del()
}

const getAttendees = async id => {
    const result = await db('attendees as a')
    .where('a.class_id', id)
    .join('classes as c', 'a.class_id', 'c.class_id')
    .join('users as u', 'a.user_id', 'u.user_id')
    .select('c.class_name', 'u.username')
    return result
}

const attendClass = async (class_id, user_id) => {
    await db('attendees').insert(class_id, user_id)
    return getAttendees(class_id.class_id)
}

module.exports = {
    get,
    getBy,
    getById,
    create,
    update,
    remove,
    getAttendees,
    attendClass
}