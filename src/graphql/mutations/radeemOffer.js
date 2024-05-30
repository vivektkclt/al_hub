import { gql } from "graphql-tag";

const radeemOffer = gql`
  mutation radeemOffer($storeId: Int!, $offerPin: String!, $offerId: Int!)
  @api(name: stores) {
    RedeemOffer(storeId: $storeId, offerPIN: $offerPin, offerId: $offerId) {
      id
      endsAt
      status
      storeId
      startsAt
      longTitle
      shortTitle
      offerValue
      redemptionCode
      longDescription
      shortDescription
      redemptionEndsAt
      redemptionDuration
      redemptionStartsAt
      userId
      offerId
    }
  }
`;

// RedeemOffer(storeId: 42, offerId: 2, offerPIN: "3449") {
//         id
//         userId
//         offerId
//         redemptionStartsAt
//         redemptionEndsAt
//         status
//         redemptionCode
//     }

export default radeemOffer;
