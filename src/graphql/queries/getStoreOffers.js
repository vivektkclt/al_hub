import { gql } from "graphql-tag";

const getStoreOffers = gql`
  query getStoreOffers($storeId: Int!) @api(name: stores) {
    OffersByStore(storeId: $storeId) {
      id
      status
      endsAt
      storeId
      startsAt
      longTitle
      offerValue
      shortTitle
      offerType
      priceType
      longDescription
      shortDescription
      redemptionDuration
    }
  }
`;

export default getStoreOffers;
