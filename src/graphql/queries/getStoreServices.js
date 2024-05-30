import { gql } from "graphql-tag";

const getStoreServices = gql`
  query getStoreServices($storeId: Int!) @api(name: stores) {
    ServiceByStore(storeId: $storeId) {
      id
      priority
      serviceType
      serviceTypeId
      services {
        serviceFiles {
          location
          bucket
          id
          key
          name
          serviceId
          type
        }
        description
        id
        price
        title
        serviceImages {
          id
          name
          type
          bucket
          location
          serviceId
          key
        }
      }
    }
  }
`;

export default getStoreServices;
