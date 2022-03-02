const Class = require('./classes_model')
const router = require('express').Router()
const { restricted, 
        forInstructor
        } = require('./../middleware/auth-middleware')
const { validClass,
        classExists 
        } = require('./../middleware/class-middleware')

router.get('/find_class', restricted, (req, res, next) => {
    Class.get()
        .then(classes => {
            res.json(classes)
        })
        .catch(e => next(e))
})

router.post('/find_class/search', restricted, (req, res, next) => {
    Class.getBy(req.body)
        .then(classes => {
            res.json(classes)
        })
        .catch(e => next(e))
})

router.post('/create_class', restricted, forInstructor, validClass, (req, res, next) => {    
    Class.create(req.body)
        .then(created => {
            res.json(created)
        })
        .catch(e => next(e))
})

router.post('/reserve_class', restricted, classExists, (req, res, next) => {
    Class.attendClass({class_id: parseInt(req.theClass.class_id), user_id: parseInt(req.decodedJWT.subject)})
        .then(attendees => {
            res.json(attendees)
        })
        .catch(e => next(e))
})

router.get('/attendees/:id', restricted, classExists, (req, res, next) => {
    Class.getAttendees(req.params.id)
        .then(attendees => {
            res.json(attendees)
        })
        .catch(e => { next(e) })
})

module.exports = router