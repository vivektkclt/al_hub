import { gql } from "graphql-tag";

const GoogleReviewsByStore = gql`
  query GoogleReviewsByStore($storeId: Int!) @api(name: stores) {
    GoogleReviewsByStore(storeId: $storeId) {
      rating
    }
  }
`;

export default GoogleReviewsByStore;
