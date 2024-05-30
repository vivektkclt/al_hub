import { gql } from "graphql-tag";

const getStoreNameById = gql`
  query getStoreById($storeId: Int!) @api(name: stores) {
    Store(id: $storeId) {
      name
      option
    }
  }
`;

export default getStoreNameById;
