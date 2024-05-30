import { gql } from "graphql-tag";

const getFavList = gql`
  query getFavList @api(name: stores) {
    AllFavoriteStore {
      id
      name
      tags
      ratings
      contacts
      location
      isFavorite
      description
      socialLinks
      averageReviewRating
      StoreImages {
        id
        key
        type
        name
        bucket
        storeId
        location
        classification
      }
    }
  }
`;

export default getFavList;
