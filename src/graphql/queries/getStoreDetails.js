import { gql } from "graphql-tag";

const getStoreDetails = gql`
  query getStoreDetails($id: Int!) @api(name: stores) {
    Store(id: $id) {
      id
      name
      tags
      ratings
      location
      contacts
      option
      features
      whatsappNumber
      workingHours
      isFavorite
      geoLocation
      socialLinks
      description
      averageReviewRating
      categories {
        id
        name
        isBookingNeeded
        bookingType
      }
      StoreImages {
        id
        key
        name
        type
        bucket
        storeId
        location
        classification
      }
    }
  }
`;

export default getStoreDetails;
