import { gql } from "graphql-tag";

const getCategoryById = gql`
  query getCategoryById ($categoryId: Int!) @api(name: category) {
    Category(id: $categoryId) {
      id
      name
      tags
      priority
      description
      CategoryImage {
        id
        key
        type
        name
        bucket
        location
        categoryId
      }
    }
  }
`;

export default getCategoryById;
