const { User, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("users");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("users");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // searchUsers: async (_, { query }) => {
    //   try {
    //     const users = await User.find({ username: { $regex: query, $options: 'i' } });
    //     return users;
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error('Error searching users');
    //   }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    updateUserName: async ({ id, username }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { username } },
        { new: true }
      );

      const token = signToken(user);
      return { token, user };
    },
    updateUserEmail: async ({ id, email }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { email } },
        { new: true }
      );

      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async ({ id }) => {
      try {
        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
          return { error: "User not found" };
        }

        const token = signToken(user);
        return { token, user };
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

    //socketio message
    Query: {
      messages: async () => await Message.find(),
    },
    Mutation: {
      postMessage: async (_, { content, clientOffset }) => {
        const message = new Message({ content, client_offset: clientOffset });
        await message.save();
        return message.id;
      },
    },
    Subscription: {
      messageAdded: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['MESSAGE_ADDED']),
      },
    },
  },
};

  module.exports = resolvers;
