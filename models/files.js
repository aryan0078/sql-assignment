module.exports = (sequelize, Sequelize) => {
  const Files = sequelize.define("files", {
      name: {
          type: Sequelize.STRING,
      },
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      url: {
          type: Sequelize.STRING,
      },
      created_at: {
          type: Sequelize.DATE,
      },
      updated_at: {
          type: Sequelize.DATE,
        },
  });
  return Files;
};
