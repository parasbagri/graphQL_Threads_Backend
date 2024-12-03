import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {prismaClient} from './lib/DB'

async function init(){
    const app = express();
    const PORT = Number(process.env.PORT) || 2002;

// jo bhi humara resonse aata hai json ke form me to usko  hume parse karna hota hai  isliye hum ye middleware ka use kar rhe hai and body-parser ka bhi use kar sakte hai. 
   app.use(express.json());

// new Apollo server here 
const gqlServer = new ApolloServer({
    // schema definitions
    typeDefs: `
     type Query{
       hello: String
       say(name:String):String
     }
     type Mutation {
        createUser(firstName:String!, lastName:String!, email:String!, password:String!, profileImageUrl:String): Boolean
     }
    `, 
    resolvers: {
        Query:{
            hello: () => 'Hello, From GrapgQL world!',
            say: (_, {name }:{name:String}) => `Hello, ${name}! how are you!`
        },
        Mutation:{
          createUser: async(_, {firstName, lastName, email, password, profileImageUrl}:{firstName:string, lastName:string, email:string, password:string , profileImageUrl:string}) => {
            await prismaClient.user.create({
              data: {
                firstName,
                lastName,
                profileImageUrl,
                email,
                password,
                solt: 'random_solt',
              },
            })
             return true;
          }

        }
    }
  });

  // start the gql srver
  await gqlServer.start();

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

// port dena hai ki grapgQl run ho us port se
app.use("/graphql", expressMiddleware(gqlServer))

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

}

init();