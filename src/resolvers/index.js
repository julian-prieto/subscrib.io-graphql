import { returnGenericOrFallbackType } from "../utils";
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
  getCreditCardByParentId,
  createCreditCard,
  updateCreditCardById,
  deleteCreditCardById,
} from "./creditCard";
import { createTag, getAllTags, getTagById, updateTagById, deleteTagById } from "./tag";
import { me } from "./user";

module.exports = {
  GenericUserResponse: {
    __resolveType(obj) {
      return returnGenericOrFallbackType(obj, "User");
    },
  },
  GenericSubscriptionResponse: {
    __resolveType(obj) {
      return returnGenericOrFallbackType(obj, "Subscription");
    },
  },
  GenericTagResponse: {
    __resolveType(obj) {
      return returnGenericOrFallbackType(obj, "Tag");
    },
  },
  GenericCreditCardResponse: {
    __resolveType(obj) {
      return returnGenericOrFallbackType(obj, "CreditCard");
    },
  },
  Subscription: {
    creditCard: getCreditCardByParentId,
    tags: async (parent, _params, ctx) => {
      return ctx.dataLoaders.tag.load(parent.tags);
    },
  },
  Query: {
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
