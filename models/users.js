module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
    },
      dob: {
          type: Sequelize.DATE,
      },
      country: {
          type: Sequelize.STRING,
          
      },
      resume: {
          type: Sequelize.STRING,
      },
  });
  return Users;
};
