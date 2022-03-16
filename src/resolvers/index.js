import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscriptionById,
  deleteSubscriptionById,
} from "./subscription";
import {
  getAllCreditCards,
  getCreditCardById,
  createCreditCard,
  updateCreditCardById,
  deleteCreditCardById,
} from "./creditCard";
import { createTag, getAllTags, getTagById, updateTagById, deleteTagById } from "./tag";
import { me } from "./user";
import { getAllCurrencies } from "./currencies";

module.exports = {
  Subscription: {
    creditCard: async (parent, _params, ctx) => {
      return parent.creditCardId ? ctx.dataLoaders.creditCard.load(parent.creditCardId) : null;
    },
    tags: async (parent, _params, ctx) => {
      return ctx.dataLoaders.tag.load(parent.tags);
    },
  },
  Query: {
    currencies: getAllCurrencies,

    me,

    subscription: getSubscriptionById,
    subscriptions: getAllSubscriptions,

    creditCard: getCreditCardById,
    creditCards: getAllCreditCards,

    tag: getTagById,
    tags: getAllTags,
  },
  Mutation: {
    createSubscription,
    updateSubscriptionById,
    deleteSubscriptionById,

    createCreditCard,
    updateCreditCardById,
    deleteCreditCardById,

    createTag,
    updateTagById,
    deleteTagById,
  },
};
