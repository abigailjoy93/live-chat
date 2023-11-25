import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER_NAME = gql`
  mutation updateUserName($_id: ID!, $username: String!) {
    updateUserName(_id: $_id, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER_EMAIL = gql`
  mutation updateUserEmail($_id: ID!, $email: String!) {
    updateUserEmail(_id: $_id, email: $email) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($user1: String!, $user2: String!) {
    addChat(user1: $user1, user2: $user2) {
      _id
      user1
      user2
      createdAt
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation deleteChat($chatId: ID!) {
    deleteChat(chatId: $chatId) {
      _id
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $messageText: String!) {
    addComment(chatId: $thoughtId, messageText: $messageText) {
      _id
      user1
      user2
      createdAt
      messages {
        _id
        messageText
        messageAuthor
        createdAt
      }
    }
  }
`;
