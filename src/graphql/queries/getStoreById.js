import { gql } from "graphql-tag";

const getStoreById = gql`
  query getStoreById($storeId: Int!) @api(name: stores) {
    Store(id: $storeId) {
      name
      workingHours
      StoreImages {
        key
      }
    }
  }
`;

export default getStoreById;
