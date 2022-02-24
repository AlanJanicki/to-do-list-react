import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation Mutation {
    deleteUser
  }
`;

export const LOGIN_USER = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      avatar
      id
      name
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($avatar: String!) {
    updateUserAvatar(avatar: $avatar) {
      avatar
      id
      name
      token
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($input: ChangePasswordInput!) {
    updateUserPassword(input: $input) {
      avatar
      id
      name
      token
    }
  }
`;
