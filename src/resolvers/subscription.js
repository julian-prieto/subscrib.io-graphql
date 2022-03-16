import { convertSubscriptionsToCurrency } from "../utils";

module.exports = {
  getSubscriptionById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Subscription.findOne({ where: { id: params.id, owner: ctx.user.email } });
  },
  getAllSubscriptions: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    const result = await ctx.db.Subscription.findAll({
      where: { owner: ctx.user.email },
      order: [["createdAt", "ASC"]],
    });

    if (params.convertToCurrency) {
      return convertSubscriptionsToCurrency(result, params.convertToCurrency, ctx);
    }

    return result;
  },
  createSubscription: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Subscription.create({
      owner: ctx.user.email,
      title: params.title,
      price: params.price,
      currency: params.currency,
      frequency: params.frequency,
      creditCardId: params.creditCardId,
      tags: params.tags,
      image: params.image,
    });
  },
  updateSubscriptionById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    const result = await ctx.db.Subscription.update(
      {
        title: params.title,
        tags: params.tags,
        price: params.price,
        currency: params.currency,
        frequency: params.frequency,
        creditCardId: params.creditCardId,
        image: params.image,
      },
      {
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      }
    );

    if (!result[0]) {
      return null;
    }

    return result[1][0].toJSON();
  },
  deleteSubscriptionById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    try {
      const result = await ctx.db.Subscription.destroy({
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      });

      if (!result.length) {
        throw Error(`Subscription ID: ${params.id} doesn't exist.`);
      }

      return result[0].toJSON();
    } catch (error) {
      throw Error(error.message);
    }
  },
};
