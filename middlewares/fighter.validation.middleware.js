const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    const errors = { error: true, message: "" }
    if (!req.body.name || req.body.name.length < 3) {
        errors.message += "Name of the fighter must contain at least 3 characters. ";
    }
    if (!req.body.power || req.body.power <= 0) {
        errors.message += "Power must be greater than 0. ";
    }
    if (!req.body.defense || req.body.defense < 1 || req.body.defense > 10) {
        errors.message += "Defense Must be between 1 and 10. ";
    }

    errors.message != "" ? next(errors) : next()
    // TODO: Implement validatior for fighter entity during creation
}

const updateFighterValid = (req, res, next) => {
    const Names=Object.keys(fighter),act=Object.keys(req.body)
    act.forEach((value)=>{
        if(!Names.includes(value))
        next({ error: true, message: "Remove unnecessary fields in the request body" })
    })
    if (Object.values(req.body).length === 0) next({ error: true, message: "request body empty" })
    else {
        const err = { error: true, message: "" }
        if (req.body.name && req.body.name.length < 3)
            err.message += "Name must contain at least 3 characters. ";
        if (+req.body?.health < 80 || +req.body?.health > 120)
            err.message += "Health 80-120. ";
        if (req.body.power && +req.body.power <= 0)
            err.message = "Power <0. ";
        if (req.body.defense && +req.body.defense < 1 || +req.body.defense > 10)
            err.message += "Defense 1-10 ";
        if (req.body.id) {
            errors.message += "Remove id from request. ";
        }

        err.message != "" ? next(err) : next()
    }
    // TODO: Implement validatior for fighter entity during update
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;