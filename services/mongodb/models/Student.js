const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
        course: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);
