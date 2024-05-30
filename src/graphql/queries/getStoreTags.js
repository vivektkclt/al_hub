import { gql } from "graphql-tag";

const getStoreTags = gql`
  query getStoresTags($limit: Int!, $geoLocation: GeoLocationInput!)
  @api(name: stores) {
    getTags(limit: $limit, geoLocation: $geoLocation)
  }
`;

export default getStoreTags;
