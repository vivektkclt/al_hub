import { gql } from "graphql-tag";

const getTableBookingByUser = gql`
  query GetBookingsByUserId($userId: Int!) @api(name: stores) {
    getBookingsByUserId(userId: $userId) {
      storeTable {
        tableNumber
        id
        seatingCapacity
        storeId
      }
      numberOfGuests
      storeTableSlotId
      status
      toTime
      bookingDate
      fromTime
      userId
      id
    }
  }
`;

export default getTableBookingByUser;
