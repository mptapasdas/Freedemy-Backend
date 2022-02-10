const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        code: {
            type: Number,
            required: [true, "Please provide course code"],
            unique: true,
        },
        title: {
            type: String,
            required: [true, "Please provide title"],
            maxlength: 50,
            unique: true,
        },
        instructor: {
            type: String,
            required: [true, "Please provide instructor"],
            maxlength: 50,
        },
        description: {
            type: String,
            required: [true, "Please provide description"],
            maxlength: 500,
        },
        imageurl: {
            type: String,
            required: [true, "Please provide imageurl"],
            maxlength: 500,
        },
        courseurl: {
            type: String,
            required: [true, "Please provide courseurl"],
            maxlength: 500,
        },
        tags: {
            type: Array,
            required: [true, "Please provide tags"],
            maxlength: 3,
        },
        //created by to identify user
        // createdBy: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "User",
        //     required: [true, "Please provide user"],
        // },
    }
    //{ timestamps: true }
);

module.exports = mongoose.model("Courses", CourseSchema);
