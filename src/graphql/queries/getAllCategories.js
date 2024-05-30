import { gql } from "@apollo/client";

const getAllCategories = gql`
  query getAllCategories @api(name: category) {
    AllCategories {
      id
      name
      tags
      priority
      description
      CategoryImage {
        id
        key
        name
        type
        bucket
        location
        categoryId
      }
    }
  }
`;

export default getAllCategories;
