const FavCourse = require("../models/FavCourse");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getFavouriteCourses = async (req, res) => {
    const favouriteCourses = await FavCourse.find({
        createdBy: req.user.userId,
    }).sort("createdAt");
    res.status(StatusCodes.OK).json({ favouriteCourses });
};

const addFavouriteCourse = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const favouriteCourse = await FavCourse.create(req.body);
    res.status(StatusCodes.CREATED).json(favouriteCourse);
};

const removeFavouriteCourse = async (req, res) => {
    const {
        user: { userId },
        params: { id: favCourseId },
    } = req;

    const favCourse = await FavCourse.findByIdAndRemove({
        _id: favCourseId,
        createdBy: userId,
    });

    if (!favCourse) {
        throw new NotFoundError(
            `No favCourse found with favCourse id ${favCourseId}`
        );
    }

    res.status(StatusCodes.OK).send("delete successful");
};

module.exports = {
    getFavouriteCourses,
    addFavouriteCourse,
    removeFavouriteCourse,
};
