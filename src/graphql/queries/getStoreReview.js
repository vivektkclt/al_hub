import { gql } from "graphql-tag";

const getStoreReview = gql`
  query getStoreReview($storeId: Int!) @api(name: stores) {
    ReviewsByStore(storeId: $storeId) {
      id
      userId
      rating
      storeId
      updatedAt
      description
      ReviewImages {
        id
        name
        type
        bucket
        reviewId
        location
      }
      User {
        id
        email
        image
        lastName
        userName
        firstName
      }
    }
  }
`;

export default getStoreReview;
