import { gql } from "graphql-tag";

const getCategoryByKeyword = gql`
  query getCategoryByKeyword($keyword: String!) @api(name: category) {
    CategoriesByFilter(keyword: $keyword) {
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

export default getCategoryByKeyword;
