import { returnGenericResponse } from "../utils";

module.exports = {
  getCreditCardByParentId: async (parent, _params, ctx) => {
    return parent.creditCardId
      ? await ctx.db.CreditCard.findOne({ where: { id: parent.creditCardId, owner: ctx.user.email } })
      : null;
  },
  getCreditCardById: async (_parent, params, ctx) => {
    return await ctx.db.CreditCard.findOne({ where: { id: params.id, owner: ctx.user.email } });
  },
  getAllCreditCards: async (_parent, _params, ctx) => {
    return await ctx.db.CreditCard.findAll({ where: { owner: ctx.user.email } });
  },
  createCreditCard: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("createCreditCard", false, `Token not valid or missing.`);

    return await ctx.db.CreditCard.create({
      owner: ctx.user.email,
      type: params.type,
      number: params.number,
    });
  },
  updateCreditCardById: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("updateCreditCardById", false, `Token not valid or missing.`);
    if (!params.type) return returnGenericResponse("updateCreditCardById", false, `Type cannot be empty.`);

    const result = await ctx.db.CreditCard.update(
      { type: params.type, number: params.number },
      {
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      }
    );

    if (!result[0]) {
      return returnGenericResponse("updateCreditCardById", false, `CreditCard ID: ${params.id} failed to update.`);
    }

    return result[1][0].toJSON();
  },
  deleteCreditCardById: async (_parent, params, ctx) => {
    if (!ctx.user) return returnGenericResponse("deleteCreditCardById", false, `Token not valid or missing.`);

    try {
      const result = await ctx.db.CreditCard.destroy({
        where: { id: params.id, owner: ctx.user.email },
        returning: true,
      });

      if (!result.length) {
        return returnGenericResponse("deleteCreditCardById", false, `CreditCard ID: ${params.id} doesn't exist.`);
      }

      return result[0].toJSON();
    } catch (error) {
      return returnGenericResponse("deleteCreditCardById", false, error.message);
    }
  },
};
