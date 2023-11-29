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
      user {
        username
      }
    }
  }
`;

export const UPDATE_USER_EMAIL = gql`
  mutation updateUserEmail($_id: ID!, $email: String!) {
    updateUserEmail(_id: $_id, email: $email) {
      user {
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      user {
        _id
      }
    }
  }
`;
