const express = require("express");
const connectToDb = require("./config/connectToDb");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
require("dotenv").config();

// Connection to DB
connectToDb();

// Init App
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
// Middlewares
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 200,
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
