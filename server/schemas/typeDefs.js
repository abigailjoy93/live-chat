const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
}

type Message {
  id: ID!
  client_offset: String!
  content: String!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username:String): User
  me: User
  searchUsers(query: String!): [User]
  messages: [Message]

}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  updateUserName(id: ID!, username: String!): User
  updateUserEmail(id: ID!, email: String!): User
  deleteUser(id: ID!): User
  login(email:String!, password: String!):Auth
  postMessage(content: String!, clientOffset: String!): ID
},

type Subscription {
  messageAdded: Message
}
`;

module.exports = typeDefs;
