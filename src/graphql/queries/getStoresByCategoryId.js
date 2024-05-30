import { gql } from "graphql-tag";

const getStoresByCategoryId = gql`
  query getStoresByCategoryId(
    $categoryId: Int!
    $pagination: PaginationInput
    $geoLocation: GeoLocationInput!
  ) @api(name: stores) {
    StoresByCategory(
      categoryId: $categoryId
      pagination: $pagination
      geoLocation: $geoLocation
    ) {
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

export default getStoresByCategoryId;
