const DataLoader = require("dataloader");

const dataLoaders = (db) => ({
  // creditCard: new DataLoader(async (keys) => {
  //   const creditCards = await db.CreditCard.findAll({
  //     where: {
  //       id: keys,
  //     },
  //   });
  //   const creditCardsMap = {};
  //   creditCards.forEach((tag) => {
  //     creditCardsMap[tag.id] = tag;
  //   });

  //   return keys.map((key) => creditCardsMap[key]);
  // }),
  tag: new DataLoader(async (keys) => {
    const tags = await db.Tag.findAll({
      where: {
        id: keys.flat(),
      },
    });

    const tagsMap = {};
    tags.forEach((tag) => {
      tagsMap[tag.id] = tag;
    });

    return keys.map((key) => key.map((k) => tagsMap[k]).filter((k) => k));
  }),
});

export default dataLoaders;
