import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const Subscription = sequelize.define(
    "subscription",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: [],
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        default: 0,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "USD",
      },
      frecuency: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "MONTHLY",
      },
      creditCardId: {
        type: DataTypes.UUID,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { underscored: true, paranoid: true }
  );

  return Subscription;
};
