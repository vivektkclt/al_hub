import { gql } from "graphql-tag";

const claimOffer = gql`
  mutation claimOffer($storeId: Int!, $offerId: Int!) @api(name: stores) {
    ClaimOffer(storeId: $storeId, offerId: $offerId) {
      id
      endsAt
      status
      storeId
      startsAt
      longTitle
      shortTitle
      offerValue
      longDescription
      shortDescription
      redemptionEndsAt
      redemptionDuration
      redemptionStartsAt
    }
  }
`;

export default claimOffer;
