const Joi = require('joi');

const outBoundCall = {
  body: Joi.object().keys({
    to: Joi.string().required(),
    from: Joi.string().required(),
    duration: Joi.number().required(),
  }),
};

const getCallHistory = {
  query: Joi.object()
    .keys({
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
    })
    .min(1),
};

module.exports = {
  outBoundCall,
  getCallHistory,
};
