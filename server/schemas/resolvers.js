const { User, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("messages");
      }
      throw AuthenticationError;
    },

    searchUsers: async (_, { query }) => {
      try {
        const users = await User.find({
          username: { $regex: query, $options: "i" },
        });
        return users;
      } catch (error) {
        console.error(error);
        throw new Error("Error searching users");
      }
    },

    // socket.io messages
    messages: async () => await Message.find(),
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    updateUserName: async (parent, { id, username }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { username: username } },
        { new: true }
      );

      return user;
    },
    updateUserEmail: async (parent, { id, email }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { email: email } },
        { new: true }
      );

      return user;
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findOneAndDelete({ _id: id });

        console.log(user);

        if (!user) {
          return { error: "User not found" };
        }

        return user;
      } catch (error) {
        return { error: "Error deleting user" };
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    // socket.io post message
    saveMessage: async (_, { message, username, room }, context) => {
      if (context.user) {
        const savedMessage = await Message.create({ message, username, room });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { messages: savedMessage._id } },
          { new: true }
        );
        return user;
      }
      throw AuthenticationError;
    },
  },

  // socket.io subs
  Subscription: {
    messageAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(["MESSAGE_ADDED"]),
    },
  },
};

module.exports = resolvers;
