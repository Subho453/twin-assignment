const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(5000),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DIALECT: Joi.string().default("mysql"),
    TWILIO_ACCOUNT_SID: Joi.string().required(),
    TWILIO_AUTH_TOKEN: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseName: envVars.DB_NAME,
  databaseHost: envVars.DB_HOST,
  databaseUser: envVars.DB_USER,
  databasePassword: envVars.DB_PASSWORD,
  dialect: envVars.DIALECT,
  twilio: {
    account_sid: envVars.TWILIO_ACCOUNT_SID,
    auth_token: envVars.TWILIO_AUTH_TOKEN,
  },
};
