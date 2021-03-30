import { gql } from "apollo-boost";

export const LOGIN = gql`
mutation authenticateUser ($email:String!, $password:String!) {
  authenticateUser(email:$email,password:$password) {
    id
    jwt
    error
  }
}
`;
