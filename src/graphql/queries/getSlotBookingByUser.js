import { gql } from "graphql-tag";

const getSlotBookingByUser = gql`
  query getSlotBookingByUser($userId: Int!) @api(name: stores) {
    SlotBookingByUser(userId: $userId) {
      id
      clinicSlots {
        id
        date
        timeSlots
        storeId
        slotStatus
      }
      status
      reasonForVisit
      notes
      phoneNumber
      bookingFor
      fullName
    }
  }
`;

export default getSlotBookingByUser;
