let College = require('../services/mongodb/models/College'),
    Student = require('../services/mongodb/models/Student')

const { validationResult } = require('express-validator');


exports.addStudent = async (req, res) => {
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

    const { name, college, year, course } = req.body;

    try {

        const student = new Student({ name, year, college, year, course })
        const studentCollege = await College.findById(college)
        studentCollege.students = studentCollege.students + 1
        await College.findByIdAndUpdate(studentCollege, studentCollege)

        // await student.save()

        return {
            data: { student },
            error: [],
            message: 'Student added successfully',
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