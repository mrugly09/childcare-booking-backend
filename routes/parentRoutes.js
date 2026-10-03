const express = require("express");
const { addChild } = require("../controllers/parentController");
const verifyToken  = require("../middleware/auth");

const router = express.Router();

router.post("/children", verifyToken, addChild);

module.exports = router;

