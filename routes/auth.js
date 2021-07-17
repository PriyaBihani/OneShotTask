var express = require('express');

let authController = require('../controllers/authController')

var router = express.Router();
const { check } = require('express-validator');

router.post(
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password field is required').isLength({
            min: 1,
        }),
    ],
    async (req, res) => {
        try {
            let userRegister = await authController.signin(req);
            let code = userRegister.statusCode;
            delete userRegister.statusCode;
            res.status(code).send(userRegister);
        } catch (error) {
            res.status(500).send({
                data: null,
                error: [{ msg: error.message }],
                message: 'Internal server error',
                status: 0,
            });
        }
    }
);


module.exports = router;
