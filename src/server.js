import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import db from "./models";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import dataLoaders from "./dataLoaders";
import { getUserData } from "./utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await getUserData(token);

    return { db, user, dataLoaders: dataLoaders(db) };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: process.env.SERVER_PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
