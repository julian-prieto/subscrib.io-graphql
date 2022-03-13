module.exports = {
  getCreditCardByParentId: async (parent, _params, ctx) => {
    return parent.creditCardId
      ? await ctx.db.CreditCard.findOne({ where: { id: parent.creditCardId, owner: ctx.user.email } })
      : null;
  },
  getCreditCardById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.CreditCard.findOne({ where: { id: params.id, owner: ctx.user.email } });
  },
  getAllCreditCards: async (_parent, _params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.CreditCard.findAll({ where: { owner: ctx.user.email }, order: [["createdAt", "ASC"]] });
  },
  createCreditCard: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");
    if (!params.number && !params.type) throw Error("At least one of [type, number] must have value");

    return await ctx.db.CreditCard.create({
      owner: ctx.user.email,
      type: params.type,
      number: params.number,
      color: params.color,
    });
  },
  updateCreditCardById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");
    // if (!params.number && !params.type) throw Error("At least one of [type, number] must have value");

    const result = await ctx.db.CreditCard.update(
      { type: params.type, number: params.number, color: params.color },
      {
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      }
    );

    if (!result[0]) {
      throw Error(`CreditCard ID: ${params.id} failed to update.`);
    }

    return result[1][0].toJSON();
  },
  deleteCreditCardById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    try {
      const result = await ctx.db.CreditCard.destroy({
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      });

      if (!result.length) {
        throw Error(`CreditCard ID: ${params.id} doesn't exist.`);
      }

      return result[0].toJSON();
    } catch (error) {
      throw Error(error.message);
    }
  },
};
