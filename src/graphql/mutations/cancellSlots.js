import { gql } from "graphql-tag";

const updateABooking = gql`
  mutation UpdateABooking($updateSlotBooking: UpdateSlotBookingInput!)
  @api(name: stores) {
    UpdateABooking(UpdateSlotBooking: $updateSlotBooking) {
      id
      status
    }
  }
`;

export default updateABooking;
