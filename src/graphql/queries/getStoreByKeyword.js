import { gql } from "graphql-tag";

const getStoreByKeyword = gql`
  query getStoreByKeyword(
    $sorting: String!
    $pagination: PaginationInput!
    $geoLocation: GeoLocationInput!
    $keywords: [String!]
    $tags: [String!]
  ) @api(name: stores) {
    StoresByFilter(
      sorting: $sorting
      keywords: $keywords
      tags: $tags
      pagination: $pagination
      geoLocation: $geoLocation
    ) {
      id
      name
      tags
      ratings
      location
      contacts
      geoLocation
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

export default getStoreByKeyword;
