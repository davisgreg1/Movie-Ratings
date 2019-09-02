require('dotenv').config();

const promise = require('bluebird');
const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
};
const connectionString = process.env.DATABASE_URL;
const pgp = require("pg-promise")(initOptions);
const db = pgp(connectionString);

module.exports = db;
  