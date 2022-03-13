import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import db from "./models";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import dataLoaders from "./dataLoaders";
import { getUserData } from "./utils";

const server = new ApolloServer({
  typeDefs: typeDefs(gql),
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await getUserData(token, db);

    return { db, user, dataLoaders: dataLoaders(db) };
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: { "schema.polling.enable": false },
    }),
  ],
});

module.exports = server;
