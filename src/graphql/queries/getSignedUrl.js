import { gql } from "graphql-tag";

const getSignedUrl = gql`
  query getSignedUrl($reviewId: Int!, $files: [JSONObject!]!)
  @api(name: stores) {
    GetReviewImagesSignedUrls(reviewId: $reviewId, filesMeta: $files)
  }
`;

export default getSignedUrl;
