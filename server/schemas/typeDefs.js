const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
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
    login(email:String!, password: String!):Auth
},

//socketio message
type Query {
    messages: [Message]
  }

  type Mutation {
    postMessage(content: String!, clientOffset: String!): ID
  }

  type Message {
    id: ID!
    client_offset: String!
    content: String!
  }

  type Subscription {
    messageAdded: Message
  }
`;


module.exports = typeDefs;
