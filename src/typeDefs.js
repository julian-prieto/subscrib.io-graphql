import { gql } from "apollo-server";
import fs from "fs";

const graphqlSchema = fs.readFileSync(__dirname.concat("/./schema/schema.graphql"), "utf8");

const typeDefs = gql(graphqlSchema);

export default typeDefs;
