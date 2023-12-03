const sgMail = require('@sendgrid/mail');

const Course = require("../models/Course");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const createCourse = async (req, res) => {
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json(course);
};

const getAllCourses = async (req, res) => {
    const allCourses = await Course.aggregate([{ $sample: { size: 30 } }]);
    res.status(StatusCodes.OK).json({
        coursesMessage: "default",
        allCourses,
    });
};

const editDist = (str1, str2) => {
    let m = str1.length;
    let n = str2.length;
    let dp = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1);
        for (let j = 0; j < n + 1; j++) {
            dp[i][j] = 0;
        }
    }

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) dp[i][j] = j;
            else if (j === 0) dp[i][j] = i;
            else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] =
                    1 +
                    Math.min(
                        dp[i][j - 1], // Insert
                        dp[i - 1][j], // Remove
                        dp[i - 1][j - 1]
                    ); // Replace
        }
    }

    return dp[m][n];
};

const searchCourses = async (req, res) => {
    let allCourses = await Course.find({});
    let searchValue = req.query.query;
    searchValue.toLowerCase();
    if (searchValue.length < 3) {
        let filteredCourses = allCourses.filter((course) => {
            let contains = false;
            for (let eachTag of course.tags) {
                contains =
                    contains || eachTag.toLowerCase().startsWith(searchValue);
            }
            return contains;
        });
        return res.json({ coursesMessage: "search", filteredCourses });
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

    return res.json({ coursesMessage: "search", filteredCourses });
};

const suggestCourse = async (req, res) => {
  try {
    const { email, courseName, courseDescription, instructor, courseUrl, thumbnailUrl } = req.body;

    const emailBody = `
      <h2>Course Suggestion</h2>
      <p>Course Name: ${courseName}</p>
      <p>Course Description: ${courseDescription}</p>
      <p>Instructor: ${instructor}</p>
      <p>Course URL: ${courseUrl}</p>
      <p>Thumbnail URL: ${thumbnailUrl}</p>
    `;

    const msg = {
      to: email,
      from: 'mptapasdas@gmail.com',
      subject: 'New Course Suggestion 🚀',
      html: emailBody,
    };

    sgMail.setApiKey(process.env.SG_API_KEY);
    await sgMail.send(msg);

    res.json({ success: true, message: 'Your course suggestion has been submitted!'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'There was an error submitting your course suggestion.' });
  }
};


module.exports = {
    createCourse,
    getAllCourses,
    searchCourses,
    suggestCourse,
};
