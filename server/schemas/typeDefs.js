const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  messages: [Message]
}

type Message {
  id: ID!
  username: String!
  room: String!
  message: String
  createdtime: String
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
  updateUserName(_id: ID!, username: String!): User
  updateUserEmail(_id: ID!, email: String!): User
  deleteUser(_id: ID!): User
  login(email:String!, password: String!):Auth
  saveMessage(message: String, username: String!, room: String!): User
},

type Subscription {
  messageAdded: Message
}
`;

module.exports = typeDefs;
