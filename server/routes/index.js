const express = require("express");
const callRoute = require("./call.routes");
const router = express.Router();

router.use("/", callRoute);

module.exports = router;
