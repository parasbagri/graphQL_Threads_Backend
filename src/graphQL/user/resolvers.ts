// resolver ke ander queries hoti hai or mutations hote hai  objects me 

const queries = {

}; 

const mutations = {
    createUser: (_: any, {}:{}) => {
        return ' ho gya'
    },
};

export const resolvers =  { queries, mutations };