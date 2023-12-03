const express = require("express");

const courseRouter = express.Router();

const {
    getAllCourses,
    createCourse,
    searchCourses,
    suggestCourse
} = require("../controllers/courses");

courseRouter.route(`/${process.env.CREATE_COURSE_ROUTE}`).post(createCourse);
courseRouter.route("/").get(getAllCourses);
courseRouter.route("/search").get(searchCourses);
courseRouter.route("/suggest").post(suggestCourse);

module.exports = courseRouter;
