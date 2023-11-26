const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Chat {
  _id: ID!
  user1: String
  user2: String
  createdAt: String
  messages: [Message]!
}

type Message {
  _id: ID
  messageText: String
  messageAuthor: String
  createdAt: String
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
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  updateUserName(id: ID!, username: String!): Auth
  updateUserEmail(id: ID!, email: String!): Auth
  deleteUser(id: ID!): Auth
  login(email:String!, password: String!): Auth
  addChat(users: String!, createdAt: String!): Chat
  deleteChat(chatId: ID!): Chat
  addMessage(chatId: ID!, messageText: String!): Chat
},
`;

module.exports = typeDefs;
