const express = require("express");
const validate = require("../middlewares/validate");
const makeCall = require("../middlewares/makeCall");
const callValidation = require("../validations/callHistory.validation");
const callController = require("../controllers/callHistory.controller");

const router = express.Router();

router
  .route("/make-outbound-call")
  .post(
    validate(callValidation.outBoundCall),
    makeCall,
    callController.createCallHistory
  );

router
  .route("/call-history")
  .get(validate(callValidation.getCallHistory), callController.getCallHistory);

router.route("/call-status").post(callController.getCallStatus);

module.exports = router;
