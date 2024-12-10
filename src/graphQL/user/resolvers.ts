// resolver ke ander queries hoti hai or mutations hote hai  objects me 

import UserService, { CreateUserPayload } from "../../services/userServices";

const queries = {
    getUserToken: async (_:any, playload:{
        email: string
        password: string
    }) =>{
        const token = await UserService.getUserToken({
            email: playload.email,
            password: playload.password
        })
        return token;
    }
}; 


// const queries = {
//     getUserToken: async (_: any, { email, password }: { email: string; password: string }) => {
//         const token = await UserService.getUserToken({
//             email,
//             password
//         });
//         return token;
//     }
// };


// type GetUserTokenPayload = {
//     email: string;
//     password: string;
// };

// const queries = {
//     getUserToken: async (_: any, playload: GetUserTokenPayload) => {
//         const token = await UserService.getUserToken({
//             email: playload.email,
//             password: playload.password
//         });
//         return token;
//     }
// };


const mutations = {
    // createUser: (_: any, playload:CreateUserPayload) => {
    //     // const result = 
    // }, 
    createUser: async (_: any, playload:CreateUserPayload) => {
         // making user
         const res = await UserService.createUser(playload);
         return res.id;
    }
};

export const resolvers =  { queries, mutations };