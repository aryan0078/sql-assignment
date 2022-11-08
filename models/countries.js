module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define("countries", {
    name: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country_code: {
      type: Sequelize.STRING,
      unique: true,
    },
  });

  return Countries;
};
