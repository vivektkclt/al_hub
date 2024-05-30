import { gql } from "graphql-tag";

const getGuestStores = gql`
  query getGuestStores @api(name: stores) {
    AllStoresGuest {
      id
      name
      tags
      ratings
      location
      contacts
      socialLinks
      description
      averageReviewRating
      StoreImages {
        id
        key
        name
        type
        bucket
        storeId
        location
        classification
      }
    }
  }
`;

export default getGuestStores;
