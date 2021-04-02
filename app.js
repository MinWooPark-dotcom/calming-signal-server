const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require("./routes");
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.set('port', process.env.PORT || 3002);


app.use(morgan('dev'));
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}))

app.use(
    cors({
      origin: "https://localhost:3000", // 배포시s3 도메인으로 변경
      method: "GET,POST,OPTION",
      credentials: true, // 쿠키를 요청에 포함
    })
  );

app.use("/", router);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트')
})