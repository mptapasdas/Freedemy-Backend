const express = require("express");

const courseRouter = express.Router();

const { getAllCourses, createCourse } = require("../controllers/courses");

courseRouter.route(`/${process.env.CREATE_COURSE_ROUTE}`).post(createCourse);
courseRouter.route("/").get(getAllCourses);

module.exports = courseRouter;
