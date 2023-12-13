const { InternalServerError } = require("../errors");
const Course = require("../models/Course");

const { editDist } = require("../utils/string-utils/StringUtils");

const searchByText = async (searchValue) => {
    let allCourses = [];

    try {
        allCourses = await Course.find({});
    } catch (error) {
        throw new InternalServerError("Could not fetch courses");
    }

    searchValue.toLowerCase();

    const searchCoursesResponse = {
        coursesMessage: "search",
        filteredCourses: [],
    };

    if (searchValue.length < 3) {
        let filteredCourses = allCourses.filter((course) => {
            let contains = false;
            for (let eachTag of course.tags) {
                contains =
                    contains || eachTag.toLowerCase().startsWith(searchValue);
            }
            return contains;
        });
        searchCoursesResponse.filteredCourses = filteredCourses;
        return searchCoursesResponse;
    }

    let filteredCourses = allCourses.filter((course) => {
        let contains = false;

        for (let eachTag of course.tags) {
            let newTag = eachTag
                .toLowerCase()
                .substring(0, Math.min(searchValue.length, eachTag.length));
            contains = contains || editDist(searchValue, newTag) < 2;
        }

        return contains;
    });

    searchCoursesResponse.filteredCourses = filteredCourses;
    return searchCoursesResponse;
};

const randomCourses = async () => {
    try {
        const allCourses = await Course.aggregate([{ $sample: { size: 30 } }]);
        return {
            coursesMessage: "default",
            allCourses,
        };
    } catch (error) {
        throw new InternalServerError("Could not fetch courses");
    }
};

const saveCourse = async (data) => {
    const course = await Course.create(data);
    return course;
};

module.exports = {
    searchByText,
    randomCourses,
    saveCourse,
};
