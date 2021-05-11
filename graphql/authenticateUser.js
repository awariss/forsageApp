/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */
 
import { gql } from "apollo-boost";

// mutation for login on server
export const LOGIN = gql`
  mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      jwt
      error
    }
  }
`;
