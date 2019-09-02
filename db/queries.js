const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/moviefights";
const db = require("./index");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const config = require('../config');
dotenv.load();

const GMAIL_PASS = process.env.GMAIL_PASS;

const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const loginUser = (req, res, next) => {
  passport.authenticate("local", {});
  const authenticate = passport.authenticate("local", (err, user, info) => {
    if (err) {
      res
        .status(500)
        .send("error while trying to log in");
    } else if (!user) {
      res
        .status(401)
        .send("invalid username/password");
    } else if (user) {
      req.logIn(user, err => {
        if (err) {
          res
            .status(500)
            .send("error");
        } else {
          const payload = {
            user: user,
            time: new Date()
          };
          const token = jwt.sign(payload, config.jwtSecret, {expiresIn: config.tokenExpireTime});
          const userWithNoPW = {
            ...req.user,
            password_digest: null,
            data: {
              token
            }
          };
          res
            .status(200)
            .send({user: userWithNoPW});
          // res.status(200).send({ ...req.user,   password_digest: null, data:token });
        }
      });
    }
  });
  return authenticate(req, res, next);
};

const logoutUser = (req, res, next) => {
  req.logout();
  res
    .status(200)
    .send("Log out success");
};

const registerUser = (req, res, next) => {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          const payload = {
            user: user,
            time: new Date()
          };
          const token = jwt.sign(payload, config.jwtSecret, {expiresIn: config.tokenExpireTime});
          res
            .status(200)
            .json({status: "success", data: user, JWT: token, message: "Registered one user"});
          const myEmail = 'davisgreg1@gmail.com';

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: myEmail,
              pass: GMAIL_PASS
            }
          });

          const mailOptions = {
            from: myEmail, // sender address
            to: `${user.email}`, // list of receivers
            subject: `Thanks for signing up ${user.firstname}!`, // Subject line
            html: `<h1>Welcome to Movie Fights!</h1>
            <strong>How to use the site:</strong>

            <h3>My Dashboard</h3>
              <p>In your dashboard, you can set up your profile by uploading a photo of yourself and editing your bio.</p>
              <p>You can privately blog about anything you'd like! Just like a diary or journal!</p>
              <br />
            <strong>Game</strong>
              <p>To play the game, you must guess which of two movies earned more money than the other by clicking your choice. It's really fun! The pop up message will inform you how much more or less your pick earned than the other in the box office.</p>
              <p>Each correct guess nets you 10 points!</p>
              <br />
            <strong>My Favorites</strong>
              <p>Here you can view all of your favorite movies!</p>
              <p>You can add movies to your favorites by searching for them on the favorites page or the home page!</p>
              <br />
            <strong>Leaderboard</strong>
              <p>Here you have a leaderboard so you can see how you stack up against other players!</p>
              <br />
              <br />
            <p>I really appreciate you for signing up, ${user.firstname}!</p> <p>Have fun playing my movie-fights game and blogging and I'll see you on the leaderboard!</p> <br /> <br /> <a href="https://moviefights.herokuapp.com/users/${user.username}/" target="_blank">Go to my dashboard!</a>`
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) 
              console.log("Error Sending Email:", err)
            else 
              console.log("Email Info:", info);
            }
          );
        }
      })(req, res, next);
    })
    .catch(err => {
      console.log("error in Register:", err);
      res
        .status(500)
        .json({status: "Error", error: err});
    });
};

updateSingleUser = (req, res, next) => {
  // const hash = authHelpers.createHash(req.body.password);
  db
    .none("UPDATE users SET username = ${username},  imgurl = ${imgurl}, firstname = ${firs" +
      "tname}, lastname = ${lastname}, email = ${email}, blurb = ${blurb}, public_id= $" +
      "{public_id} WHERE id = ${id}", {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    // password: hash,
    blurb: req.body.blurb,
    imgurl: req.body.imgurl,
    public_id: req.body.public_id,
    id: req.user.id
  })
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", message: "Changed the user"});
    })
    .catch(err => {
      console.log("Bruhh,...");
      return next(err);
    });
};

const getScore = (req, res, next) => {
  db
    .one("SELECT * FROM scores WHERE user_id = ${id}", req.user)
    .then(data => {
      res
        .status(200)
        .json({status: "success", data: data, message: "Fetched user's score"});
    })
    .catch(err => {
      return next(err);
    });
};

const setScoreToZero = (req, res, next) => {
  db
    .any("INSERT INTO scores (user_id) VALUES (${id})", req.body)
    .then(() => {
      res
        .status(200)
        .json({status: "Success.", message: "Successfully inserted score!"});
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send("Error inserting score");
    });
};

const updateUserScore = (req, res, next) => {
  db
    .none("UPDATE scores SET points = ${points} WHERE user_id = ${id}", req.body)
    .then(data => {
      res
        .status(200)
        .json({status: "Success.", message: "Successfully updated the users score!"});
    })
    .catch(err => {
      return next(err);
    });
};

const getPostFromUser = (req, res, next) => {
  db
    .any("SELECT * FROM blogs WHERE user_id = ${id} ORDER BY time_posted DESC", req.user)
    .then(data => {
      res
        .status(200)
        .json({status: "Success.", body: data, message: `Successfully retrieved all of ${req.user.firstname}'s blog posts!`});
    })
    .catch(err => {
      return next(err);
    });
};

const postNewBlog = (req, res, next) => {
  db
    .any("INSERT INTO blogs (user_id, blog_title, blog_body, time_posted) VALUES (${user_i" +
      "d}, ${blog_title}, ${blog_body}, NOW())", {
    user_id: req.user.id,
    blog_title: req.body.blog_title,
    blog_body: req.body.blog_body
  })
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", message: "Successfully inserted the new blog!"});
    })
    .catch(err => {
      return next(err);
    });
};

const editBlog = (req, res, next) => {
  db
    .any("UPDATE blogs SET blog_title = $1, blog_body = $2, time_edited = NOW() WHERE id =" +
      " $3",
  [req.body.blog_title, req.body.blog_body, req.body.id])
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", message: "Successfully updated the blog!"});
    })
    .catch(err => {
      return next(err);
    });
};

const removeBlog = (req, res, next) => {
  db
    .result("DELETE FROM blogs WHERE id = $1", [req.params.id])
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", message: `Successfully deleted blog.`});
    })
    .catch(err => {
      return next(err)
    })
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
    .none("INSERT INTO favorites (movie_imdb_id, movie_title, movie_imgurl, movie_website, " +
      "favorited_by) VALUES (${movie_imdb_id}, ${movie_title}, ${movie_imgurl}, ${movie" +
      "_website}, ${favorited_by})",
  req.body)
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", movieDBID: data, message: "Successfully added a favorite movie."});
    });
};

const removeFromFavorites = (req, res, next) => {
  db
    .none("DELETE FROM favorites WHERE id = ${id}", req.body)
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", message: `Successfully deleted movie #${req.body.id}.`});
    });
};

const getAllFavorites = (req, res, next) => {
  db
    .any("SELECT * from favorites WHERE favorited_by = ${id}", req.user)
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", data: data, message: "Got all the favorite movies!"});
    });
};

const getSingleUser = (req, res, next) => {
  db
    .one("SELECT * FROM users WHERE username = ${username}", req.user)
    .then(data => {
      res
        .status(200)
        .json({status: "success", userInfo: data, message: "Fetched one user"});
    })
    .catch(err => {
      return next(err);
    });
};

const getUserByUsername = (req, res, next) => {
  db
    .any("SELECT * FROM users WHERE username = ${username}", req.params)
    .then(data => {
      res
        .status(200)
        .json({status: "success", user: data, message: `Retrieved user: ${req.params.username}!`});
    })
    .catch(err => {
      console.log(`err in getUserByUsername`, err);
      res
        .status(500)
        .json({message: `FAILED: getUserByUsername`});
    });
};

const getUserFromToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];
  if (!token) {
    return res
      .status(401)
      .json({message: 'Must pass token'});
  }
  token = token.replace('Bearer ', '');
  jwt.verify(token, config.jwtSecret, function (err, user) {
    if (err) 
      throw err;
    db
      .one("SELECT * FROM users WHERE id = $1", [req.user.id])
      .then(data => {
        const userWithNoPW = {
          ...data,
          password_digest: null,
          data: {
            token
          }
        };
        res
          .status(200)
          .json({status: "success", user: userWithNoPW, message: "Reauthenticated one user"});
      })
      .catch(err => {
        return next(err);
      });

    // note: you can renew token by creating new token(i.e. refresh it) w/ new
    // expiration time at this point, but I'm passing the old token back. var token
    // = utils.generateToken(user); res.json({user: user, token: token});
  })
}

getLeaderBoard = (req, res, next) => {
  db
    .any("SELECT * FROM (SELECT username, points FROM users JOIN scores ON user_id = ID) A" +
      "S Leaderboard ORDER BY points DESC LIMIT 10")
    .then(data => {
      res
        .status(200)
        .json({status: "Success!", data: data, message: `Retrieved the top 10 players!`});
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
  updateUserScore,
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
  getSingleUser,
  getUserByUsername,
  getScore,
  getLeaderBoard,
  updateSingleUser,
  getPostFromUser,
  postNewBlog,
  removeBlog,
  editBlog,
  getUserFromToken
};
