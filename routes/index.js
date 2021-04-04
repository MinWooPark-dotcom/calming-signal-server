const express = require("express");
const router = express.Router();

const {
    landing,
    signup,
    signin,
    board
} = require("../controllers");

// * GET /
router.get("/", landing.get);

// * POST /signup
router.post("/signup", signup.post);

// * POST /signin
router.post("/signin", signin.post);

// GET /board
router.get('/board/:category', board.get);

module.exports = router;
