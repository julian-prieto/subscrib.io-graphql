module.exports = {
  getAllCurrencies: async (_parent, _params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Currency.findAll({
      order: [["id", "ASC"]],
    });
  },
};
