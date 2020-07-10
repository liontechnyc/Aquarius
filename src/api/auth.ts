import gql from 'graphql-tag';

export const CACHED_AUTH_STATE_QUERY = gql`
  query ReadCachedAuthState {
    isLoggedIn @client
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        confirmed
        blocked
        email
        username
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($identity: String!, $password: String!) {
    login(input: { identifier: $identity, password: $password }) {
      jwt
      user {
        id
        confirmed
        blocked
        email
        username
      }
    }
  }
`;

export const VERIFY_USER_MUTATION = gql`
  mutation VerifyUser($token: String!) {
    emailConfirmation(confirmation: $token) {
      jwt
      user {
        id
        confirmed
        blocked
        email
        username
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $newPassword: String!
    $passwordConfirmation: String!
    $token: String!
  ) {
    resetPassword(
      password: $newPassword
      passwordConfirmation: $passwordConfirmation
      code: $token
    ) {
      jwt
      user {
        id
        confirmed
        blocked
        email
        username
      }
    }
  }
`;
