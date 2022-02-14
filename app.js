require("dotenv").config();
require("express-async-errors");

const swagger = require("./swagger.json");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const authenticateUser = require("./middleware/authentication");
//db connect

const connectDB = require("./db/connect");

//routes

const authRouter = require("./routes/auth");
const coursesRouter = require("./routes/courses");
const favCoursesRouter = require("./routes/favCourses");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra packages
app.set("trust proxy", 1);
// app.use(
//     rateLimiter({
//         windowMs: 15 * 60 * 1000, // 15 minutes
//         max: 100, // limit each IP to 100 requests per windowMs
//     })
// );
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/swagger.json", (req, res) => {
    res.status(200).json(swagger);
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/favourites", authenticateUser, favCoursesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("connected to db");
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
