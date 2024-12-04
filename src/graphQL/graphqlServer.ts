import { ApolloServer } from "@apollo/server"; 
import { User } from "./user";

async function createGraphqlServer() {
  const gqlServer = new ApolloServer({
    // GraphQL schema definition
    typeDefs: `
      ${User.typeDefs}     
      type Mutation {
        ${User.mutations}   
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries, // Queries resolvers
      },
      Mutation: {
        ...User.resolvers.mutations, // Mutations resolvers
      },
    },
  });

  // Start the GraphQL server
  await gqlServer.start();
  return gqlServer;
}

export default createGraphqlServer;
