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

  function registerUser(req, res, next) {
    return authHelpers
      .createUser(req)
      .then(response => {
        passport.authenticate("local", (err, user, info) => {
          if (user) {
            res.status(200).json({
              status: "success",
              data: user,
              message: "Registered one user"
            });
          }
        })(req, res, next);
      })
      .catch(err => {
        console.log(error);
        res.status(500).json({
          status: "Error",
          error: err
        });
      });
  }

const getScore = (req, res, next) => {
  db
  .one(
    "SELECT * FROM scores WHERE user_id = ${id}",req.user
  ) .then((data)=> {
    res.status(200).json({
      status: "success",
      data: data,
      message: "Fetched user's score"
    });
  })
  .catch((err)=> {
    return next(err);
  });
}

const setScoreToZero = (req, res, next)=> {
  db
  .any(
    "INSERT INTO scores (user_id) VALUES (${id})",
    {
      user_id: req.body.user_id
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
/**
|--------------------------------------------------
| movie_imdb_id VARCHAR,
  movie_title VARCHAR,
  movie_imgurl VARCHAR,
  movie_website VARCHAR,
  favorited_by INTEGER REFERENCES users(ID)
|--------------------------------------------------
*/
const addToFavorites = (req, res, next) => {
  db
  .none(
    "INSERT INTO favorites (movie_imdb_id, movie_title, movie_imgurl, movie_website, favorited_by) VALUES (${movie_imdb_id}, ${movie_title}, ${movie_imgurl}, ${movie_website}, ${favorited_by})",req.body
  )
  .then(data => { 
    res.status(200).json({
      status: "Success!",
      message: "Successfully added a favorite movie."

    });
  });
}

const removeFromFavorites = (req, res, next) => {
  db
  .none(
    "DELETE FROM favorites WHERE id = ${id}", req.body
  )
  .then(data => {
    res.status(200).json({
      status: "Success!",
      message: "Successfully deleted the movie."
    });
  });
}

const getAllFavorites = (req, res, next) => {
  db
  .any(
    "SELECT * from favorites WHERE favorited_by = ${user_id}", req.body
  )
  .then(data => {
    res.status(200).json({
      status: "Success!",
      data: data,
      message: "Got all the favorite movies!"
    });
  });
}

const getSingleUser = (req, res, next) => {
  db
    .one("SELECT * FROM users WHERE username = ${username}", req.user)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        userInfo: data,
        message: "Fetched one user"
      });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getUserByUsername(req, res, next) {
  db
    .one(
      "SELECT * FROM users WHERE LOWER(username) = LOWER(${username})",
      req.params
    )
    .then(function (data) {
      res.status(200).json({
        status: "success",
        user: data,
        message: `Retrieved user: ${req.params.username}!`
      });
    })
    .catch(err => {
      if (err.code === 0) {
        res.status(500).send(`${req.params.username} not found.`);
      } else {
        res.status(500).send("Oops, something went wrong.");
      }
    });
}

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  setScoreToZero,
  updateUserScore,
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
  getSingleUser,
  getUserByUsername,
  getScore,
};
