const express = require("express");
const router = express.Router();

const {
    landing,
    signup,
    signin,
    board,
    logout,
    content
} = require("../controllers");

// * GET /
router.get("/", landing.get);

// * POST /signup
router.post("/signup", signup.post);

// * POST /signin
router.post("/signin", signin.post);

// GET /board
router.get('/board/:category', board.get);

// POST / board
router.post('/board/', board.post);

// POST /logout
router.post('/logout', logout.post)

// GET / content
router.get('/content/:title', content.get)

module.exports = router;
