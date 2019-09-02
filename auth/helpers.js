const bcrypt = require("bcryptjs");
const db = require("../db/index");

// Compare userPassword from the request to databasePassword from the database
function comparePass(userPassword, databasePassword) {
  // databasePassword has hash and salt
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createHash(password) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db.none(
      "INSERT INTO users (username, firstname, lastname, email, password_digest) VALUES (${username}, ${firstname},  ${lastname}, ${email}, ${password})", {
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
      }
  )
}

module.exports = {
  comparePass,
  createHash,
  createUser
};
