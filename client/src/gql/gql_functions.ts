import { gql } from "@apollo/client";

export const GetAllTags = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;

export const RegisterMutation = gql`
  mutation register($email: String!, $userName: String!, $password: String!) {
    register(email: $email, userName: $userName, password: $password)
  }
`;

export const Create = gql`
  mutation createReview(
    $userId: String!
    $id: String!
    $title: String!
    $body: String!
    $authorMark: Int
    $categoryId: String!
    $tags: [String] #    $photos: [PhotoInput]
  ) {
    createReview(
      userId: $userId
      id: $id
      title: $title
      body: $body
      authorMark: $authorMark
      categoryId: $categoryId
      tags: $tags #      photos: $photos
    ) {
      ... on EntityResult {
        messages
      }
    }
  }
`;
