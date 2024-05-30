import { gql } from "graphql-tag";

const getStoresByTags = gql`
  query {
    FilterStore(tag: $tag, pagination: $pagination, geoLocation: $geoLocation) {
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
        __typename
      }
      __typename
      priceType
    }
  }
`;

export default getStoresByTags;
