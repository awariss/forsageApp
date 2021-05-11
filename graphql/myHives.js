/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */

import { gql } from "apollo-boost";

//query for data about hives and senzores
export const HIVES = gql`
  query myHives {
    currentAccount {
      hwSensors {
        nodes {
          id
          serialNumber
          internalName
          activeHwHub {
            activeSite {
              id
              name
            }
          }
          activeHive {
            id
            name
          }
        }
      }
    }
  }
`;
