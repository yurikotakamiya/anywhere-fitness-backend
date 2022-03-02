const Class = require('./../classes/classes_model')

const validClass = (req, res, next) => {
    if (!req.body.class_name || 
        !req.body.class_type || 
        !req.body.class_category ||
        !req.body.start_time || 
        !req.body.duration || 
        !req.body.curr_attendees || 
        !req.body.max_attendees || 
        !req.body.level ||
        !req.body.location ) {
            next({status: 400, message: 'input required sections'})
        } else {
            next()
        }
}

const classExists = (req, res, next) => {
    Class.getBy({class_id: req.body.class_id}).first()
        .then(c => {
            if (c) {
                req.theClass = c
                next()
            } else {
                next({status: 404, message: 'class was not found'})
            }
        })
        .catch(e => next(e))
}

module.exports = { 
    validClass,
    classExists
}