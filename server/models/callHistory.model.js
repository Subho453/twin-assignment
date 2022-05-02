const CallHistory = (sequelize, Sequelize) =>
  sequelize.define("call_history", {
    sid: {
      type: Sequelize.STRING,
    },
    from: {
      type: Sequelize.STRING,
    },
    to: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    start_time: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    end_time: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

module.exports = CallHistory;
