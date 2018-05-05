let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

/**
|--------------------------------------------------
| POST ROUTES BELOW...
|--------------------------------------------------
*/
router.post("/register", db.registerUser); 
router.post("/login", db.loginUser);
router.post("/score_zero", loginRequired, db.setScoreToZero);
router.post("/addFavorites", loginRequired, db.addToFavorites);

/**
|--------------------------------------------------
| GET ROUTES BELOW...
|--------------------------------------------------
*/
router.get("/logout", loginRequired, db.logoutUser);
router.get("/favorites", loginRequired, db.getAllFavorites);
router.get("/userinfo", loginRequired, db.getSingleUser);
router.get("/getuser/:username", db.getUserByUsername)

/**
|--------------------------------------------------
| PATCH ROUTES BELOW....
|--------------------------------------------------
*/
router.patch("/score_update", loginRequired, db.updateUserScore);

/**
|--------------------------------------------------
| DELETE ROUTES BELOW...
|--------------------------------------------------
*/
router.delete("/removeFavorites", loginRequired, db.removeFromFavorites);


module.exports = router;