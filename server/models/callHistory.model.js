const CallHistory = (sequelize, Sequelize) =>
  sequelize.define("call_history", {
    answered_by: {
      type: Sequelize.STRING,
    },
    caller_name: {
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
    },
    end_time: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

module.exports = CallHistory;
