import { returnGenericResponse } from "../utils";

module.exports = {
  me: async (_parent, _params, ctx) => {
    if (!ctx.user) return returnGenericResponse("me", false, `Token not valid or missing.`);

    return ctx.user;
  },
};
