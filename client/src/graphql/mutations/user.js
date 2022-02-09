import { gql } from '@apollo/client';

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
  mutation Register($input: RegisterInput) {
    register(input: $input) {
      id
    }
  }
`;
