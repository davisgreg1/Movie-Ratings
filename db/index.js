var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/moviefights";
var db = pgp(connectionString);

module.exports = db;
  