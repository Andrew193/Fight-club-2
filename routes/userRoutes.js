const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post("/", createUserValid, responseMiddleware, (req, res) => {
    if (!res.error) {
        if (!UserService.search(req.body)) {
            UserService.add(req.body)
            res.statusCode = 200;
            res.json({ error: false, message: 'User created' })
        } else {
            res.statusCode = 400;
            res.json({ error: true, message: 'User already exists' })
        }
    }
})
router.get("/", (req, res, next) => {
    const allUsers = UserService.getAll();
    if (allUsers.length === 0)
        res.data = { error: true, message: "Empty storage" };
    else
        res.data = allUsers;
    responseMiddleware(null, req, res, next);
})
router.get("/:id", (req, res, next) => {
    const user = UserService.searchOne(req.params.id);
    if (user === undefined || user === null) {
        res.data = { error: true, message: "Empty storage or not found" };
        responseMiddleware(null, req, res, next);
    }
    else {
        res.status(200)
        res.json(user);
    }
})
router.delete("/:id", (req, res, next) => {
    const user = UserService.delete(req.params.id)
    if (user.length > 0) {
        res.status(200)
        res.json(user[0])
    } else {
        res.data = { message: "Already deleted or does not exist" }
        responseMiddleware(null, req, res, next)
    }
})
router.put("/:id", updateUserValid, responseMiddleware, (req, res, next) => {
    if (!res.error) {
        const user = UserService.searchOne(req.params.id);
        if (user === undefined || user === null || UserService.searchBy(req.body) != undefined) {
            res.data = { error: true, message: "No such user found or cannot be changed" };
            responseMiddleware(null, req, res, next);
        } else {
            const updateUse = UserService.change(req.params.id, req.body);
            res.status(200)
            res.json(updateUse);
        }
    }
})
// TODO: Implement route controllers for user

module.exports = router;