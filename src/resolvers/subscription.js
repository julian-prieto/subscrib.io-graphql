import { returnGenericResponse } from "../utils";

module.exports = {
  getSubscriptionById: async (_parent, params, ctx) => {
    return await ctx.db.Subscription.findOne({ id: params.id });
  },
  getAllSubscriptions: async (_parent, _params, ctx) => {
    return await ctx.db.Subscription.findAll();
  },
  createSubscription: async (_parent, params, ctx) => {
    return await ctx.db.Subscription.create({
      owner: params.owner,
      title: params.title,
      price: params.price,
      currency: params.currency,
      frecuency: params.frecuency,
      creditCardId: params.creditCardId,
      tags: params.tags,
    });
  },
  deleteSubscriptionById: async (_parent, params, ctx) => {
    try {
      const result = await ctx.db.Subscription.destroy({
        where: { id: params.id, owner: params.owner },
        returning: true,
      });

      if (!result.length) {
        return returnGenericResponse(
          "deleteSubscriptionById",
          false,
          `Subscription ID: ${params.id} doesn't exist.`
        );
      }

      return result[0].dataValues;
    } catch (error) {
      return returnGenericResponse("deleteSubscriptionById", false, error.message);
    }
  },
};
