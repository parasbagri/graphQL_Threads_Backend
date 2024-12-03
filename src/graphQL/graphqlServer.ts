import { ApolloServer } from "@apollo/server";
// import { typeDefs } from "./schema";
// import { resolvers } from "./resolvers";

const gqlserver = new ApolloServer({
    typeDefs: `
      type Query{
         hello:string      
      } 
      type mutations: {
      }      
    `
})