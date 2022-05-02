const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

const client = require("twilio")(
  config.twilio.account_sid,
  config.twilio.auth_token
);

const makeCall = async (req, res, next) => {
  try {
    const call = await client.calls.create({
      method: "GET",
      statusCallback: "http://localhost:8000/api/call-status",
      statusCallbackMethod: "POST",
      url: "http://demo.twilio.com/docs/voice.xml",
      to: req.body.to,
      from: req.body.from,
      timeLimit: req.body.duration,
    });

    req.data = call;
    return next();
  } catch (error) {
    return next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
};

module.exports = makeCall;
