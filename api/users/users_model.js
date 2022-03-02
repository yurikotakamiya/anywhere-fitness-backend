const db = require('./../data/db-config')

const get = () => {
    return db('users')
}

const getBy = filter => {
    return db('users').where(filter)
}

const getById = id => {
    return db('users').where('user_id', id)
}

const create = async user => {
    const username  = user.username
    await db('users').insert(user)
    return getBy({username})
}

const update = (id, changes) => {
    return db('users').where('user_id', id).update(changes)
}

const remove = id => {
    return db('users').where('user_id', id).del()
}

module.exports = {
    get,
    getBy,
    getById,
    create,
    update,
    remove
}