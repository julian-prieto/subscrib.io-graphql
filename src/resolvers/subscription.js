import { returnGenericResponse } from "../utils";

module.exports = {
  getSubscriptionById: async (_parent, params, ctx) => {
    return await ctx.db.Subscription.findOne({ id: params.id, owner: ctx.user.email });
  },
  getAllSubscriptions: async (_parent, _params, ctx) => {
    return await ctx.db.Subscription.findAll({ where: { owner: ctx.user.email } });
  },
  createSubscription: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("createSubscription", false, `Token not valid or missing.`);

    return await ctx.db.Subscription.create({
      owner: ctx.user.email,
      title: params.title,
      price: params.price,
      currency: params.currency,
      frecuency: params.frecuency,
      creditCardId: params.creditCardId,
      tags: params.tags,
      image: params.image,
    });
  },
  updateSubscriptionById: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("updateSubscriptionById", false, `Token not valid or missing.`);
    if (!params.title) return returnGenericResponse("updateSubscriptionById", false, `Title cannot be empty.`);
    if (!params.currency) return returnGenericResponse("updateSubscriptionById", false, `Currency cannot be empty.`);
    if (!params.frecuency) return returnGenericResponse("updateSubscriptionById", false, `Frecuency cannot be empty.`);

    const result = await ctx.db.Subscription.update(
      {
        title: params.title,
        tags: params.tags,
        price: params.price,
        currency: params.currency,
        frecuency: params.frecuency,
        creditCardId: params.creditCardId,
        image: params.image,
      },
      {
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      }
    );

    if (!result[0]) {
      return returnGenericResponse("updateSubscriptionById", false, `Subscription ID: ${params.id} failed to update.`);
    }

    return result[1][0].toJSON();
  },
  deleteSubscriptionById: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("deleteSubscriptionById", false, `Token not valid or missing.`);

    try {
      const result = await ctx.db.Subscription.destroy({
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      });

      if (!result.length) {
        return returnGenericResponse("deleteSubscriptionById", false, `Subscription ID: ${params.id} doesn't exist.`);
      }

      return result[0].toJSON();
    } catch (error) {
      return returnGenericResponse("deleteSubscriptionById", false, error.message);
    }
  },
};
