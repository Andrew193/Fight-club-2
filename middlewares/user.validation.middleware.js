const { user } = require('../models/user');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const errors = { error: true, message: "" }
    if (!req.body.firstName || req.body.firstName.length < 3)
        errors.message += "First name must contain at least 3 characters. ";
    if (!req.body.lastName || req.body.lastName.length < 3)
        errors.message += "Last name must contain at least 3 characters. ";
    if (!req.body.password || req.body.password.length < 3)
        errors.message += "Password must contain at least 3 characters. ";
    if (!req.body.email || !req.body.email.endsWith("@gmail.com") || req.body.email.length < 13)
        errors.message += "Wrong email. ";
    if (!req.body.phoneNumber || !req.body.phoneNumber.startsWith("+380") || req.body.phoneNumber.length<13)
        errors.message += "Wrong phone number.";

    errors.message != ""? next(errors) : next()
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    let errors = { error: true, message: "" }
    if (Object.values(req.body).length === 0) {
        next({ error: true, message: "Request body empty" });
    }
    else {
        if (req.body.firstName && req.body.firstName.length < 3) {
            errors.message += "First name must contain at least 3 characters. ";
        }
        console.log("1");
        if (req.body.lastName && req.body.lastName.length < 3) {
            errors.message += "Last name must contain at least 3 characters. ";
        }
        if (req.body.password && req.body.password.length < 3) {
            errors.message += "Password must contain at least 3 characters. ";
        }
        if (req.body.email && !req.body.email.endsWith("@gmail.com")) {
            errors.message += "Wrong email. ";
        }
        console.log("w");
        if ((req.body.phoneNumber && !req.body.phoneNumber.startsWith("+380") &&req.body.phoneNumber.length<13)) {
            errors.message += "Wrong phone number. ";
        }
        if (req.body.id) {
            errors.message += "Remove id from request. ";
        }

        errors.message!=""?next(errors):next()
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;