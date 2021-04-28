const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME_PRODUCTION,
    password: process.env.DATABASE_PASSWORD_PRODUCTION,
    database: process.env.DATABASE_NAME_PRODUCTION,
    host: process.env.DATABASE_HOST_PRODUCTION,
    dialect: "mysql",
    port: process.env.DATABASE_PORT_PRODUCTION,
  },
};
