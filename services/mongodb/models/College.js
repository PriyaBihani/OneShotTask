const mongoose = require('mongoose');

const CollegeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        students: {
            type: Number,
            default: 0
        },
        courses: [{ type: String }],
        tier: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('College', CollegeSchema);
