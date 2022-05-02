const catchAsync = require("../utils/catchAsync");
const { callHistoryService } = require("../services");

const getCallHistory = catchAsync(async (req, res) => {
  const result = await callHistoryService.getCallHistory(
    req.query.limit,
    req.query.offset
  );
  res.send(result);
});

const createCallHistory = catchAsync(async (req, res) => {
  const result = await callHistoryService.createCallHistory(req.data);
  res.send(result);
});

const getCallStatus = catchAsync(async (req, res) => {
  const result = await callHistoryService.getCallStatus(req);
  res.send(result);
});

module.exports = {
  getCallHistory,
  createCallHistory,
  getCallStatus,
};
