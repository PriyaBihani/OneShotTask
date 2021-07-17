var express = require('express');
let collegeController = require('../controllers/collegeController')
let authMiddleware = require('../services/middlewares/auth');
const { check } = require('express-validator');

var router = express.Router();

router.get('/college/all', async (req, res) => {
    try {
        let colleges = await collegeController.getAllColleges(req);
        let code = colleges.statusCode;
        delete colleges.statusCode;
        res.status(code).send(colleges);
    } catch (error) {
        res.status(500).send({
            data: null,
            error: [{ msg: error.message }],
            message: 'Internal server error',
            status: 0,
        });
    }
})

router.post(
    '/college/add',
    authMiddleware,
    [
        check('name', 'name field is required').notEmpty(),
        check('city', 'city field is required').isLength({
            min: 1,
        }),
        check('state', 'state field is required').isLength({
            min: 1,
        }),
        check('year', 'year field is required').isLength({
            min: 1,
        }),
        check('students', 'students field is required').notEmpty(),
        check('courses', 'courses field is required').notEmpty(),
        check('tier', 'tier field is required').notEmpty(),
    ],
    async (req, res) => {
        try {
            let college = await collegeController.addCollege(req);
            let code = college.statusCode;
            delete college.statusCode;
            res.status(code).send(college);
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

router.get('/college/:name', async (req, res) => {
    try {
        let college = await collegeController.getCollege(req);
        let code = college.statusCode;
        delete college.statusCode;
        res.status(code).send(college);
    } catch (error) {
        res.status(500).send({
            data: null,
            error: [{ msg: error.message }],
            message: 'Internal server error',
            status: 0,
        });
    }
})


router.get('/college/in/:region', async (req, res) => {
    try {
        let colleges = await collegeController.getCollegeInRegion(req);
        let code = colleges.statusCode;
        delete colleges.statusCode;
        res.status(code).send(colleges);
    } catch (error) {
        res.status(500).send({
            data: null,
            error: [{ msg: error.message }],
            message: 'Internal server error',
            status: 0,
        });
    }
})


module.exports = router;
