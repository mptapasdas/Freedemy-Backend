const FavCourse = require("../models/FavCourse");
const { InternalServerError, NotFoundError } = require("../errors");

const fetchFavoriteCourses = async (data) => {
    try {
        const favouriteCourses = await FavCourse.find({
            createdBy: data.user.userId,
        }).sort("createdAt");
        favouriteCourses.reverse();
        return {
            authorized: "true",
            favouriteCourses,
        };
    } catch (error) {
        throw new InternalServerError("Could not fetch courses");
    }
};

const saveFavoriteCourse = async (data) => {
    try {
        data.body.createdBy = data.user.userId;
        const favouriteCourse = await FavCourse.create(data.body);
        return favouriteCourse;
    } catch (error) {
        throw new InternalServerError("Could save the course");
    }
};

const deleteFavoriteCourse = async (data) => {
    const {
        user: { userId },
        params: { code },
    } = data;

    try {
        const favCourse = await FavCourse.deleteOne(
            { code: code },
            { createdBy: userId }
        );
        if (!favCourse) {
            throw new NotFoundError(`No favCourse found with code ${code}`);
        }
        return {
            success: "true",
            message: "delete successful",
        };
    } catch (error) {
        throw new InternalServerError("Could delete the course");
    }
};

module.exports = {
    fetchFavoriteCourses,
    saveFavoriteCourse,
    deleteFavoriteCourse,
};
