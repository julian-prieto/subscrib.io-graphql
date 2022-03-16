import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const Currency = sequelize.define(
    "currencies",
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: DataTypes.STRING,
      rate: DataTypes.STRING,
      updatedDate: DataTypes.STRING,
    },
    { underscored: true, paranoid: true, timestamps: false }
  );

  return Currency;
};
