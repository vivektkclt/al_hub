import { gql } from "graphql-tag";

const updateABooking = gql`
  mutation UpdateTableBooking($updateTableBooking: UpdateTableBookingInput!)
  @api(name: stores) {
    UpdateTableBooking(UpdateTableBooking: $updateTableBooking)
  }
`;

export default updateABooking;
