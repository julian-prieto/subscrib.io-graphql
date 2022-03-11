module.exports = {
  getCreditCardByParentId: async (parent, _params, ctx) => {
    return parent.creditCardId
      ? await ctx.db.CreditCard.findOne({ id: parent.creditCardId })
      : null;
  },
  getCreditCardById: async (_parent, params, ctx) => {
    return await ctx.db.CreditCard.findOne({ id: params.id });
  },
  getAllCreditCards: async (_parent, _params, ctx) => {
    return await ctx.db.CreditCard.findAll();
  },
  createCreditCard: async (_parent, params, ctx) => {
    return await ctx.db.CreditCard.create({
      owner: params.owner,
      type: params.type,
      number: params.number,
    });
  },
};
