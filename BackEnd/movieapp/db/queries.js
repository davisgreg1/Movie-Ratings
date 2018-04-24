const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/moviefights";
const db = pgp(connectionString);

const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const loginUser = (req, res, next) => {
  passport.authenticate("local", {});
  const authenticate = passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).send("error while trying to log in");
    } else if (!user) {
      res.status(401).send("invalid username/password");
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).send("error");
        } else {
          res.status(200).send({ ...req.user, password_digest: null });
        }
      });
    }
  });
  return authenticate(req, res, next);
};

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send("log out success");
};

/**
  |--------------------------------------------------
  | FOR FUTURE USE PERHAPS...
  |(zipcode,email,age,hobbies)VALUES(${zipcode}, ${email}, ${age}
  |, ${hobbies} )
  |--------------------------------------------------
  , ${points} for insertScore's VALUES
  */

const registerUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  let newUser = db
    .none(
      "INSERT INTO users (username, firstname, lastname,password_digest) VALUES (${username}, ${firstname}, ${lastname},${password})",
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        // imgurl: req.body.imgurl,
        password: hash
      })
       
    .then(() => {
      res.send(`Created user: ${req.body.username}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error creating user.");
    });
};

const setScoreToZero = (req, res, next)=> {
  db
  .none(
    "INSERT INTO scores (user_id) VALUES (${id})",
    {
      id: req.body.id
      // points: req.body.points
    }
  )  .then(() => {
    res.status(200)
    .json({
      status: 'Success.',
      message: 'Successfully inserted score!'
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).send("Error inserting score");
  });
}

const updateUserScore = (req, res, next) => {

  db
    .none(
      "UPDATE scores SET points = ${points} WHERE user_id = ${id}",
      req.body
    )
    .then(data => {
      res.status(200).json({
        status: "Success.",
        message: "Successfully updated the users score!"
      });
    })
    .catch(err => {
      return next(err);
    });
};
module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  setScoreToZero,
  updateUserScore
};
