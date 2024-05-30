import { gql } from "graphql-tag";

const getOfferDetails = gql`
  query getOfferDetails($offerId: Int!, $storeId: Int!) @api(name: stores) {
    OfferDetails(id: $offerId, storeId: $storeId) {
      id
      endsAt
      status
      storeId
      startsAt
      longTitle
      shortTitle
      offerValue
      longDescription
      offerType
      priceType
      shortDescription
      redemptionEndsAt
      redemptionDuration
      redemptionStartsAt
    }
  }
`;

export default getOfferDetails;
