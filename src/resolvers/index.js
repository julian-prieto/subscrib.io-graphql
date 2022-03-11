import { returnGenericOrFallbackType } from "../utils";
import {
  getAllCreditCards,
  getCreditCardById,
  getCreditCardByParentId,
  createCreditCard,
} from "./creditCard";
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  deleteSubscriptionById,
} from "./subscription";
import { createTag, getAllTags, getTagById, deleteTagById } from "./tag";

module.exports = {
  DeleteSubscriptionByIdResponse: {
    __resolveType(obj) {
      return returnGenericOrFallbackType(obj, "Subscription");
    },
  },
  DeleteTagByIdResponse: {
    __resolveType(obj) {
      return returnGenericOrFallbackType(obj, "Tag");
    },
  },
  Subscription: {
    creditCard: getCreditCardByParentId,
    tags: async (parent, _params, ctx) => {
      return ctx.dataLoaders.tag.load(parent.tags);
    },
  },
  Query: {
    subscription: getSubscriptionById,
    subscriptions: getAllSubscriptions,
    creditCard: getCreditCardById,
    creditCards: getAllCreditCards,
    tag: getTagById,
    tags: getAllTags,
  },
  Mutation: {
    createSubscription,
    deleteSubscriptionById,
    createCreditCard,
    createTag,
    deleteTagById,
  },
};
