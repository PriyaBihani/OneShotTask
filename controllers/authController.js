const { validationResult } = require('express-validator');
const { signJWT } = require('../services/jwt/jwt');

exports.signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return {
            data: null,
            error: errors.array(),
            message: 'Validation Error',
            statusCode: 400,
            status: 0,
        };
    }

    const { email, password } = req.body;

    try {

        const isMatch = email === "admin@mail.com" && password === "password";

        if (!isMatch) {
            return {
                data: null,
                error: [],
                message: 'Failed to authenticate',
                statusCode: 200,
                status: 0,
            };
        }

        const token = signJWT({ email, password });

        return {
            data: { token },
            error: [],
            message: 'Login Success',
            statusCode: 200,
            status: 1,
        };
    } catch (err) {
        console.error(err.message);
        return {
            data: null,
            error: [{ msg: 'Internal server error' }],
            message: 'Internal server error',
            statusCode: 500,
            status: 0,
        };
    }
};