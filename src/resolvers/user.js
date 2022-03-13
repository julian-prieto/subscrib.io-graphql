module.exports = {
  me: async (_parent, _params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return ctx.user;
  },
};
