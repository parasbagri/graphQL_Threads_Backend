// mutations.js

export const mutations = `
  createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageUrl: String): String
  updateUser(id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): String
`;
