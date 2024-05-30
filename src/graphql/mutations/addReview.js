import { gql } from "graphql-tag";

const addReview = gql`
  mutation AddReview($ReviewInput: AddReviewInput!) @api(name: stores) {
    AddReview(ReviewInput: $ReviewInput) {
      id
      userId
      rating
      storeId
      updatedAt
      description
      User {
        id
        email
        image
        userName
        lastName
        firstName
      }
      ReviewImages {
        id
        key
        name
        bucket
        reviewId
        location
      }
    }
  }
`;

export default addReview;
