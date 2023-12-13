const { StatusCodes } = require("http-status-codes");
const {
    fetchFavoriteCourses,
    saveFavoriteCourse,
    deleteFavoriteCourse,
} = require("../service/FavoriteCoursesService");

const getFavouriteCourses = async (req, res) => {
    const favouriteCoursesResponse = await fetchFavoriteCourses(req);
    res.status(StatusCodes.OK).json(favouriteCoursesResponse);
};

const addFavouriteCourse = async (req, res) => {
    const addFavouriteCourseResponse = await saveFavoriteCourse(req);
    res.status(StatusCodes.CREATED).json(addFavouriteCourseResponse);
};

const removeFavouriteCourse = async (req, res) => {
    const removeFavouriteCourseResponse = await deleteFavoriteCourse(req);
    res.status(StatusCodes.OK).json(removeFavouriteCourseResponse);
};

module.exports = {
    getFavouriteCourses,
    addFavouriteCourse,
    removeFavouriteCourse,
};
