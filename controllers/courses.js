const Course = require("../models/Course");
const { StatusCodes } = require("http-status-codes");
const { sendSuggestionEmails } = require("../service/EmailService");
const { searchByText, randomCourses } = require("../service/CourseService");

const createCourse = async (req, res) => {
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json(course);
};

const getAllCourses = async (req, res) => {
    const getAllCoursesResponse = await randomCourses();
    res.status(StatusCodes.OK).json(getAllCoursesResponse);
};

const searchCourses = async (req, res) => {
    const searchCoursesResponse = await searchByText(req.query.query);
    return res.status(StatusCodes.OK).json(searchCoursesResponse);
};

const suggestCourse = async (req, res) => {
    const suggestCourseResponse = await sendSuggestionEmails(req.body);
    res.status(StatusCodes.ACCEPTED).json(suggestCourseResponse);
};

module.exports = {
    createCourse,
    getAllCourses,
    searchCourses,
    suggestCourse,
};
