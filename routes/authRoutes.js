const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        res.data = AuthService.login(req.body);
        if (res.data) {
            res.statusCode = 200;
            res.json({ error: false, message: 'Welcome' })
        } else {
            res.statusCode = 404;
            res.json({ error: false, message: 'User not found' })
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;