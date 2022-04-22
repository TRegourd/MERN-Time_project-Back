var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

require("./dbConnect");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var projectsRouter = require("./routes/projects");
var timesRouter = require("./routes/timesheet");
var authRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/timesheet", timesRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
