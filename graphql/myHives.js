import { gql } from "apollo-boost";

export const HIVES = gql`
query myHives {
	currentAccount {
    id
    sites {
      hives {
        id
        name
        internalName
        activeMetrics
        }
    }
  }
}
`;
