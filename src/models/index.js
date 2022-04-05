import { Sequelize } from "sequelize";
import SubscriptionModel from "./Subscription";
import CreditCardModel from "./CreditCard";
import TagModel from "./Tag";
import UserModel from "./User";
import CurrencyModel from "./Currency";
import pg from "pg";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: process.env.POSTGRES_HOST === "localhost" ? false : true,
    },
    logging: false,

    // logging: true,
    // benchmark: true,
    //
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const CreditCard = CreditCardModel(sequelize);
const Tag = TagModel(sequelize);
const User = UserModel(sequelize);
const Subscription = SubscriptionModel(sequelize);
const Currency = CurrencyModel(sequelize);

CreditCard.sync({ force: false });
Tag.sync({ force: false });
User.sync({ force: false });
Subscription.sync({ force: false });

export default {
  Sequelize,
  sequelize,
  Subscription,
  CreditCard,
  Tag,
  User,
  Currency,
};
