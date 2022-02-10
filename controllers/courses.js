const Course = require("../models/Course");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const createCourse = async (req, res) => {
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json(course);
};

const getAllCourses = async (req, res) => {
    const allCourses = await Course.find({});
    res.status(StatusCodes.OK).json({ allCourses });
};

module.exports = {
    createCourse,
    getAllCourses,
};
