import { gql } from "graphql-tag";

const getBestOffers = gql`
  query getBestOffers @api(name: stores) {
    FeaturedOffers {
      id
      storeId
      shortTitle
      longTitle
      shortDescription
      longDescription
      offerType
      priceType
      offerValue
      startsAt
      endsAt
      redemptionStartsAt
      redemptionEndsAt
      OfferImage {
        location
        key
        name
        offerId
        id
        bucket
        type
      }
    }
  }
`;

export default getBestOffers;
