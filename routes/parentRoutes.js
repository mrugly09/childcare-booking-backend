const express = require("express");

const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/role");

const { addChild } = require("../controllers/parentController");

const router = express.Router();

router.post(
    "/children/add",
    verifyToken,
    checkRole("PARENT"),
    addChild
);

module.exports = router;