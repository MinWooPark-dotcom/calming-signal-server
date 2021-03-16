const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require("./routes");
const dotenv = require('dotenv');

const connect = require('./schemas')

dotenv.config()
const app = express();
app.set('port', process.env.PORT || 3002);
connect()

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

app.use("/", router);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트')
})