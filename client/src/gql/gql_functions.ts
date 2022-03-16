import { gql } from "@apollo/client";

export const GetAllTags = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;
