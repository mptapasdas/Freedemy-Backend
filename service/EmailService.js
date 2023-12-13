const sgMail = require("@sendgrid/mail");
const { InternalServerError } = require("../errors");

sgMail.setApiKey(process.env.SG_API_KEY);

const sendSuggestionEmails = async (data) => {
    const {
        email,
        courseName,
        courseDescription,
        instructor,
        courseUrl,
        thumbnailUrl,
    } = data;

    const emailBody = `
        <h2>Course Suggestion</h2>
        <p>Course Name: ${courseName}</p>
        <p>Course Description: ${courseDescription}</p>
        <p>Instructor: ${instructor}</p>
        <p>Course URL: ${courseUrl}</p>
        <p>Thumbnail URL: ${thumbnailUrl}</p>
    `;

    const messageToSuggestor = {
        to: email,
        from: "mptapasdas@gmail.com",
        subject: "New Course Suggestion 🚀",
        html: emailBody,
    };

    const messageToAdmin = {
        to: "tapas.das.cer19@itbhu.ac.in",
        from: "mptapasdas@gmail.com",
        subject: "New Course Suggestion 🚀",
        html: emailBody,
    };

    try {
        await sgMail.send(messageToSuggestor);
        await sgMail.send(messageToAdmin);
        return {
            success: true,
            message: "Your course suggestion has been submitted!",
        };
    } catch (error) {
        throw new InternalServerError(
            "There was an error submitting your course suggestion."
        );
    }
};

module.exports = { sendSuggestionEmails };
