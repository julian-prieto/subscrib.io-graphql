import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      givenName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      familyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { underscored: true, paranoid: true }
  );

  return User;
};
