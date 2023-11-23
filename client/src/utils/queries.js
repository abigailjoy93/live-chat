import { gql } from "@apollo/client";

export const QUERY_ONE_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      username
      email
    }
  }
`;
