import { Sequelize } from "sequelize";
import SubscriptionModel from "./Subscription";
import CreditCardModel from "./CreditCard";
import TagModel from "./Tag";
import UserModel from "./User";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
    logging: false,
  }
);

const CreditCard = CreditCardModel(sequelize);
const Tag = TagModel(sequelize);
const User = UserModel(sequelize);
const Subscription = SubscriptionModel(sequelize);

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
};
