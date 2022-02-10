const express = require("express");

const favCourseRouter = express.Router();

const {
    getFavouriteCourses,
    addFavouriteCourse,
    removeFavouriteCourse,
} = require("../controllers/favCourses");

favCourseRouter.route("/").get(getFavouriteCourses).post(addFavouriteCourse);
favCourseRouter.route("/:id").delete(removeFavouriteCourse);

module.exports = favCourseRouter;
