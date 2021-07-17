var express = require('express')
let studentController = require('../controllers/studentController')
let authMiddleware = require('../services/middlewares/auth');
const { check } = require('express-validator');
var router = express.Router();


router.post(
    '/student/add',
    authMiddleware,
    [
        check('name', 'name field is required').notEmpty(),
        check('year', 'name field is required').notEmpty(),
        check('college', 'name field is required').notEmpty(),
    ],
    async (req, res) => {
        try {
            let student = await studentController.addStudent(req);
            let code = student.statusCode;
            delete student.statusCode;
            res.status(code).send(student);
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
