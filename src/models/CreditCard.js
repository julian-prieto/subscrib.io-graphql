import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const CreditCard = sequelize.define(
    "creditcard",
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { underscored: true, paranoid: true }
  );

  return CreditCard;
};
