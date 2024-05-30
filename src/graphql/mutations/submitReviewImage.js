import { gql } from "graphql-tag";

const submitReviewImage = gql`
  mutation submitReviewImages($reviewId: Int!, $filesMeta: [JSONObject!]!)
  @api(name: stores) {
    SaveReviewImagesUrls(reviewId: $reviewId, filesMeta: $filesMeta) {
      id
      key
      name
      type
      bucket
      location
      reviewId
      __typename
      priceType
    }
  }
`;

export default submitReviewImage;
