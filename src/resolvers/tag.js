import { returnGenericResponse } from "../utils";

module.exports = {
  getTagById: async (_parent, params, ctx) => {
    return await ctx.db.Tag.findOne({ id: params.id });
  },
  getAllTags: async (_parent, _params, ctx) => {
    return await ctx.db.Tag.findAll();
  },
  createTag: async (_parent, params, ctx) => {
    return await ctx.db.Tag.create({
      owner: params.owner,
      name: params.name,
    });
  },
  createTag: async (_parent, params, ctx) => {
    return await ctx.db.Tag.create({
      owner: params.owner,
      name: params.name,
    });
  },
  deleteTagById: async (_parent, params, ctx) => {
    try {
      const result = await ctx.db.Tag.destroy({
        where: { id: params.id, owner: params.owner },
        returning: true,
      });

      if (!result.length) {
        return returnGenericResponse("deleteTagById", false, `Tag ID: ${params.id} doesn't exist.`);
      }

      return result[0].dataValues;
    } catch (error) {
      return returnGenericResponse("deleteTagById", false, error.message);
    }
  },
};
