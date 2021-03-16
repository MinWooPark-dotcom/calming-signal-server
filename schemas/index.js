const mongoose = require('mongoose');
require("dotenv").config();

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'calming-signal',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합시다');
});

module.exports = connect;