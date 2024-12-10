import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import createGrapgqlServer from './graphQL/graphqlServer'

async function init(){
    const app = express();
    const PORT = Number(process.env.PORT) || 2002;

// jo bhi humara resonse aata hai json ke form me to usko  hume parse karna hota hai  isliye hum ye middleware ka use kar rhe hai and body-parser ka bhi use kar sakte hai. 
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

// start the gql srver
const gqlServer = await createGrapgqlServer()
// graphQL Port
app.use("/graphql", expressMiddleware(gqlServer))

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

}

init();