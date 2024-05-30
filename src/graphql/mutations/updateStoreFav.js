import { gql } from "graphql-tag";

const updateStoreFav = gql`
  mutation updateStoreFav($saveFavorite: CreateFavoriteInput!)
  @api(name: stores) {
    SaveFavorite(saveFavorite: $saveFavorite) {
      userId
      storeId
      isFavorite
    }
  }
`;

export default updateStoreFav;
