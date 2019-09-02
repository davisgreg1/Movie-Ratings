let db = require("../db/queries");
var express = require("express");
var router = express.Router();
// const { loginRequired } = require("../auth/helpers");
const AuthMiddlewares = require('../middlewares/auth');
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
router.post("/addFavorites", AuthMiddlewares.checkAuth, db.addToFavorites);
router.post("/new_blog", AuthMiddlewares.checkAuth, db.postNewBlog);

/**
|--------------------------------------------------
| GET ROUTES BELOW...
|--------------------------------------------------
*/
router.get("/logout", AuthMiddlewares.checkAuth, db.logoutUser);
router.get("/favorites", AuthMiddlewares.checkAuth, db.getAllFavorites);
router.get("/userinfo", AuthMiddlewares.checkAuth, db.getSingleUser);
router.get("/getuser/:username", AuthMiddlewares.checkAuth, db.getUserByUsername);
router.get("/getcurrentscore", AuthMiddlewares.checkAuth, db.getScore);
router.get("/leaderboard", db.getLeaderBoard);
router.get("/all_blogs", db.getPostFromUser);
router.get("/auth_token", db.getUserFromToken);
/**
|--------------------------------------------------
| PATCH ROUTES BELOW....
|--------------------------------------------------
*/
router.patch("/score_update", AuthMiddlewares.checkAuth, db.updateUserScore);
router.patch("/edit", AuthMiddlewares.checkAuth, db.updateSingleUser);
router.patch("/edit_blog", AuthMiddlewares.checkAuth, db.editBlog);

/**
|--------------------------------------------------
| DELETE ROUTES BELOW...
|--------------------------------------------------
*/
router.delete("/removeFavorite", AuthMiddlewares.checkAuth, db.removeFromFavorites);
router.delete("/removeBlog/:id", AuthMiddlewares.checkAuth, db.removeBlog);


module.exports = router;
