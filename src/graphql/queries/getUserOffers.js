import { gql } from "graphql-tag";

const getUserOffers = gql`
  query getUserOffers @api(name: stores) {
    UserOffers {
      id
      endsAt
      status
      storeId
      startsAt
      longTitle
      shortTitle
      offerValue
      offerType
      priceType
      longDescription
      shortDescription
      redemptionEndsAt
      redemptionDuration
      redemptionStartsAt
    }
  }
`;

export default getUserOffers;
