const httpStatus = require("http-status");
const db = require("../models");
const ApiError = require("../utils/ApiError");

const getCallHistory = async (limit, offset) => {
  const callHistory = await db.callHistory.findAll({ offset, limit });
  if (!callHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, "No records found");
  }
  return callHistory;
};

const createCallHistory = async (data) => {
  try {
    const callHistory = await db.callHistory.create(data);
    return callHistory;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = {
  getCallHistory,
  createCallHistory,
};