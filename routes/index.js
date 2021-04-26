const express = require("express");
const router = express.Router();

const {
  landing,
  signup,
  signin,
  board,
  logout,
  content,
  comment,
  userInfo,
  mypage,
  weather,
} = require("../controllers");

// * GET /
router.get("/", landing.get);

// * POST /signup
router.post("/signup", signup.post);

// * POST /signin
router.post("/signin", signin.post);

// GET /board
router.get("/board/:category", board.get);

// POST / board
router.post("/board/", board.post);

// POST /logout
router.post("/logout", logout.post);

// GET / content
router.get("/content/:title", content.get);

// POST / comment
router.post("/comment", comment.post);

// GET / userInfo
router.get("/userinfo", userInfo.get);

// * PATCH /mypage
router.patch("/mypage/:category", mypage.patch);

// * POST /mypage
router.post("/mypage/:category", mypage.post);

// * DELETE /mypage
router.delete("/mypage/:category", mypage.delete);

// * GET /weather
router.get("/weather", weather.get);
// * POST /weather
router.post("/weather", weather.post);

module.exports = router;
