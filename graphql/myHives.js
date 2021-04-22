import { gql } from "apollo-boost";

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
