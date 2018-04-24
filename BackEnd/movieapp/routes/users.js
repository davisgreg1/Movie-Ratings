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
router.post("/login", db.loginUser)
router.post("/register", db.registerUser); 
router.post("/score_zero", loginRequired, db.setScoreToZero)

/**
|--------------------------------------------------
| GET ROUTES BELOW...
|--------------------------------------------------
*/
router.get("/logout", loginRequired, db.logoutUser);
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/**
|--------------------------------------------------
| PATCH ROUTES BELOW....
|--------------------------------------------------
*/
router.patch("/score_update", loginRequired, db.updateUserScore)

module.exports = router;
