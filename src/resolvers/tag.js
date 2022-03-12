import { returnGenericResponse } from "../utils";

module.exports = {
  getTagById: async (_parent, params, ctx) => {
    return await ctx.db.Tag.findOne({ where: { id: params.id, owner: ctx.user.email } });
  },
  getAllTags: async (_parent, _params, ctx) => {
    return await ctx.db.Tag.findAll({ where: { owner: ctx.user.email } });
  },
  createTag: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("createTag", false, `Token not valid or missing.`);

    return await ctx.db.Tag.create({
      owner: ctx.user.email,
      name: params.name,
    });
  },
  updateTagById: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("updateTagById", false, `Token not valid or missing.`);
    if (!params.name) return returnGenericResponse("updateTagById", false, `Name cannot be empty.`);

    const result = await ctx.db.Tag.update(
      { name: params.name },
      {
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      }
    );

    if (!result[0]) {
      return returnGenericResponse("updateTagById", false, `Tag ID: ${params.id} failed to update.`);
    }

    return result[1][0].toJSON();
  },
  deleteTagById: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("deleteTagById", false, `Token not valid or missing.`);

    try {
      const result = await ctx.db.Tag.destroy({
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      });

      if (!result.length) {
        return returnGenericResponse("deleteTagById", false, `Tag ID: ${params.id} doesn't exist.`);
      }

      return result[0].toJSON();
    } catch (error) {
      return returnGenericResponse("deleteTagById", false, error.message);
    }
  },
};
