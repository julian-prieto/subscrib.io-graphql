import { getCostsByCurrency } from "../utils";

module.exports = {
  getSubscriptionById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Subscription.findOne({ where: { id: params.id, owner: ctx.user.email } });
  },
  getAllSubscriptions: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    const where = { owner: ctx.user.email };

    if (params.tags) {
      where.tags = {
        [ctx.db.Sequelize.Op.contains]: params.tags,
      };
    }

    const result = await ctx.db.Subscription.findAll({
      where,
      order: [["createdAt", "ASC"]],
    });

    const withCalculatedCurrencies = getCostsByCurrency(result, ctx);

    return withCalculatedCurrencies;
  },
  createSubscription: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    const result = await ctx.db.Subscription.create({
      owner: ctx.user.email,
      title: params.title,
      price: params.price,
      currency: params.currency,
      frequency: params.frequency,
      creditCardId: params.creditCardId,
      tags: params.tags,
      image: params.image,
    });

    const withCalculatedCurrencies = getCostsByCurrency(result, ctx);

    return withCalculatedCurrencies;
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

    const withCalculatedCurrencies = getCostsByCurrency(result[1][0], ctx);

    return withCalculatedCurrencies;
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
