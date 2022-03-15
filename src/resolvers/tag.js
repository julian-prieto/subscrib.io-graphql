module.exports = {
  getTagById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Tag.findOne({ where: { id: params.id, owner: ctx.user.email } });
  },
  getAllTags: async (_parent, _params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Tag.findAll({ where: { owner: ctx.user.email }, order: [["createdAt", "ASC"]] });
  },
  createTag: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    return await ctx.db.Tag.create({
      owner: ctx.user.email,
      name: params.name,
    });
  },
  updateTagById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");
    if (!params.name) throw Error("Name can't be empty");

    const result = await ctx.db.Tag.update(
      { name: params.name },
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
  deleteTagById: async (_parent, params, ctx) => {
    if (!ctx.user) throw Error("Invalid token");

    try {
      const result = await ctx.db.Tag.destroy({
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      });

      if (!result.length) {
        if (!ctx.user) throw Error(`Tag ID: ${params.id} doesn't exist.`);
      }

      return result[0].toJSON();
    } catch (error) {
      throw Error(error.message);
    }
  },
};
