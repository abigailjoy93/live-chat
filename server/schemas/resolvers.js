const { User } = require("../models");
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
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async ({ id, username, email }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { username, email } },
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
  },
};

module.exports = resolvers;
