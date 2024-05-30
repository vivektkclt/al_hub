import { gql } from "@apollo/client";

export const getStoreTableSlot = gql`
  query TableSlotsByTableId($storeTableSlotId: Int!) @api(name: stores) {
    StoreTableSlot(id: $storeTableSlotId) {
      storeTable {
        storeId
      }
    }
  }
`;
