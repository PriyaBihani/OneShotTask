const College = require('../services/mongodb/models/College')
const { validationResult } = require('express-validator');

exports.getAllColleges = async () => {

    try {
        const colleges = await College.find({})
        return {
            data: { colleges },
            error: [],
            message: 'College added successfully',
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
}


exports.addCollege = async (req, res) => {
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

    const { name, city, state, year, students, courses, tier } = req.body;

    try {

        const college = new College({ name, city, state, year, students, courses, tier })

        await college.save()

        return {
            data: { college },
            error: [],
            message: 'College added successfully',
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


exports.addCollege = async (req, res) => {
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

    const { name, city, state, year, students, courses, tier } = req.body;

    try {

        const college = new College({ name, city, state, year, students, courses, tier })

        await college.save()

        return {
            data: { college },
            error: [],
            message: 'College added successfully',
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



exports.getCollegeInRegion = async (req, res) => {

    const { region } = req.params;
    console.log(region)

    try {

        const colleges = await College.aggregate([
            {
                $match: {
                    $expr: {
                        $or: [
                            { $eq: ["$city", region] },
                            { $eq: ["$state", region] }
                        ]
                    }
                }
            },

        ])
        // console.log(college)

        return {
            data: { colleges },
            error: [],
            message: 'College fetched successfully',
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




exports.getCollege = async (req, res) => {

    const { name } = req.params;
    console.log(name)

    try {

        const college = await College.aggregate([
            {
                $match: {
                    name: {
                        $eq: name,
                    }
                },
            },
            {
                $lookup: {
                    from: "students",
                    let: { collegeId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$college", "$$collegeId"] },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                year: 1,
                                course: 1,
                            },
                        },
                    ],
                    as: "students",
                },
            },
            {
                $lookup: {
                    from: "colleges",
                    let: { collegeId: "$_id", collegeCity: "$city", collegeState: "$state" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $ne: ["$_id", "$$collegeId"] },
                            },
                        },
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$city", "$$collegeCity"] },
                                        { $eq: ["$state", "$$collegeState"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "nearbyColleges",
                },
            },
            { $limit: 1 }
        ])
        // console.log(college)

        return {
            data: { college },
            error: [],
            message: 'College fetched successfully',
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

