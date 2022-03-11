import { OAuth2Client } from "google-auth-library";

export const getUserData = async (token, db) => {
  let cleanToken;

  if (token.startsWith("Bearer ")) {
    cleanToken = token.substring(7, token.length);
  } else {
    return null;
  }

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(googleClientId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: cleanToken,
      audience: googleClientId,
    });
    const user = ticket.getPayload();

    const [dbUser, _created] = await db.User.findOrCreate({
      where: { email: user.email },
      defaults: {
        email: user.email,
        name: user.name,
        givenName: user.given_name,
        familyName: user.family_name,
        picture: user.picture,
      },
    });

    return dbUser.toJSON();
  } catch (error) {
    return null;
  }
};

export const returnGenericResponse = (action, success, message) => {
  const genericResponse = {
    action,
    success,
    message,
  };

  return genericResponse;
};

export const returnGenericOrFallbackType = (obj, fallbackType) => {
  if (obj.action || obj.success || obj.message) {
    return "GenericResponse";
  }

  return fallbackType;
};
