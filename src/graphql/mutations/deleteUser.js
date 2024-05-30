import { gql } from "graphql-tag";
const uid = 237;
const deleteUser = gql`
  mutation deleteUser($uid: Float!) @api(name: stores) {
    deleteUser(id: $uid)
  }
`;

export default deleteUser;
