import { gql } from "graphql-tag";

const bookASlot = gql`
  mutation BookASlot($slotBookingInput: slotBookingInput!) @api(name: stores) {
    BookASlot(slotBookingInput: $slotBookingInput) {
      id
      bookingFor
      userId
      phoneNumber
      fullName
      notes
      reasonForVisit
      status
      clinicSlots {
        timeSlots
        date
      }
    }
  }
`;

export default bookASlot;
