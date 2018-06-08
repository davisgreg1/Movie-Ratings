let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");
var cookieParser = require('cookie-parser');



/**
|--------------------------------------------------
| POST ROUTES BELOW...
|--------------------------------------------------
*/
router.post("/register", db.registerUser); 
router.post("/login", db.loginUser);
router.post("/score_zero", db.setScoreToZero);
router.post("/addFavorites", loginRequired, db.addToFavorites);
router.post("/new_blog", loginRequired, db.postNewBlog);

/**
|--------------------------------------------------
| GET ROUTES BELOW...
|--------------------------------------------------
*/
router.get("/logout", loginRequired, db.logoutUser);
router.get("/favorites", loginRequired, db.getAllFavorites);
router.get("/userinfo", loginRequired, db.getSingleUser);
router.get("/getuser/:username", loginRequired, db.getUserByUsername);
router.get("/getcurrentscore", loginRequired, db.getScore);
router.get("/leaderboard", db.getLeaderBoard);
router.get("/all_blogs", db.getPostFromUser);
/**
|--------------------------------------------------
| PATCH ROUTES BELOW....
|--------------------------------------------------
*/
router.patch("/score_update", loginRequired, db.updateUserScore);
router.patch("/edit", loginRequired, db.updateSingleUser);
router.patch("/edit_blog", loginRequired, db.editBlog);

/**
|--------------------------------------------------
| DELETE ROUTES BELOW...
|--------------------------------------------------
*/
router.delete("/removeFavorite", loginRequired, db.removeFromFavorites);
router.delete("/removeBlog/:id", loginRequired, db.removeBlog);


module.exports = router;