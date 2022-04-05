import { OAuth2Client } from "google-auth-library";

export const ALLOWED_CURRENCIES = ["USD", "EUR", "GBP", "ARS"];

export const round = (value, decimals = 2) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

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

    // const [dbUser, _created] = await db.User.findOrCreate({
    //   where: { email: user.email },
    //   defaults: {
    //     email: user.email,
    //     name: user.name,
    //     givenName: user.given_name,
    //     familyName: user.family_name,
    //     picture: user.picture,
    //   },
    // });
    const dbUser = await db.User.findOne({ where: { email: user.email } });

    if (!dbUser) {
      const newUser = await db.User.create({
        email: user.email,
        name: user.name,
        givenName: user.given_name,
        familyName: user.family_name,
        picture: user.picture,
      });

      return newUser.toJSON();
    }

    return dbUser.toJSON();
  } catch (error) {
    return null;
  }
};

export const getCostsByCurrency = async (sub, ctx) => {
  const currenciesFromDB = await ctx.db.Currency.findAll();
  const currencies = currenciesFromDB
    .map((c) => c.toJSON())
    .filter((c) => ALLOWED_CURRENCIES.includes(c.id))
    .reduce((prev, curr) => {
      return {
        ...prev,
        [curr.id]: curr.rate,
      };
    }, {});

  if (!Array.isArray(sub)) {
    return {
      ...sub.toJSON(),
      cost: Object.entries(currencies).map(([c]) => ({
        currency: c,
        value: round((sub.price / currencies[sub.currency]) * currencies[c]),
      })),
    };
  }

  const subscriptions = sub.map((sub) => ({
    ...sub.toJSON(),
    cost: Object.entries(currencies).map(([c]) => ({
      currency: c,
      value: round((sub.price / currencies[sub.currency]) * currencies[c]),
    })),
  }));

  return subscriptions;
};
