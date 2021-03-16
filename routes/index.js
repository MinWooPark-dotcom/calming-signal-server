const express = require("express");
const router = express.Router();

const {
  board,
  boardPage,
  landing,
  signin,  
  signup,
  user,
} = require("../controllers");

// * GET / board
router.get("/board/:id", board.get);

// * GET / boardPage
router.get("/board", boardPage.get);

// * GET / landing
router.get("/", landing.get);

// * POST / signin
router.post("/signin", signin.post);

// * POST / signup
router.post("/signup", signup.post);

// * GET / userinfo
router.get("/userinfo", user.get);



module.exports = router;
