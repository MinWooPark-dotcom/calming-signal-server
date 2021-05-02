const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3002);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      //secure: true,
      // sameSite: "none",
    },
    name: "session-cookie",
  })
);

app.use(
  cors({
    origin: ["https://calming-signal.ml", "https://www.calming-signal.ml"],
    method: "GET,POST,OPTION, PATCH",
    credentials: true,
  })
);

app.use("/", router);

app.listen(80, () => {
  console.log("80번 포트");
});
