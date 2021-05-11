/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */

import { gql } from "apollo-boost";

// Mutation for registering device
export const REGISTER_TOKEN = gql`
  mutation registerPushNotificationDevice($pushToken: String!) {
    registerPushNotificationDevice(pushToken: $pushToken) {
      result {
        success
        errors {
          fullMessages
        }
      }
    }
  }
`;
