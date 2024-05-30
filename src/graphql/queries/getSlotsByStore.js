import { gql } from "graphql-tag";

const getSlotsByStoreId = gql`
  query getSlotsByStoreId($storeId: Int!) @api(name: stores) {
    SlotsByStoreId(storeId: $storeId) {
        timeSlots
        slotStatus
        storeId
        date
        id
    }
  }
`;


export default getSlotsByStoreId;
