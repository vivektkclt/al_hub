import { gql } from "graphql-tag";
//  categoryIds: "40,39,37,27,30,43";
const getStoreByCategoryFilter = gql`
  query getStoreByCategoryFilter(
    $pagination: PaginationInput!
    $geoLocation: GeoLocationInput!
  ) @api(name: stores) {
    StoresByCategoryFilter(
      categoryIds: "37,40,39,46,30,43,27,20,49,28,10"
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

export default getStoreByCategoryFilter;
