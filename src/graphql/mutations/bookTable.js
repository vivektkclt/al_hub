import { gql } from "graphql-tag";

const bookATable = gql`
  mutation BookATable($tableBookingInput: TableBookingInput!)
  @api(name: stores) {
    BookATable(tableBookingInput: $tableBookingInput)
  }
`;
export default bookATable;
