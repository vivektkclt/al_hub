import { gql } from "@apollo/client";

export const getAllTableByStoreId = gql`
  query TableSlotByStore($storeId: Int!) @api(name: stores) {
    TableSlotByStore(storeId: $storeId) {
      id
      closingTime
      date
      openingTime
      slotStatus
      storeTable {
        id
        seatingCapacity
        tableNumber
      }
      storeTableId
    }
  }
`;
