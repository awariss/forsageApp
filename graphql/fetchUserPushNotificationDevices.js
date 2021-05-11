/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */
import { gql } from "apollo-boost";

//query for take data about user and his devices
export const FETCH_USER_PUSH_NOTIFICATION_DEVICES = gql`
  query fetchUserPushNotificationDevices {
    currentUser {
      id
      name
      pushNotificationDevices {
        id
        pushToken
      }
    }
  }
`;
