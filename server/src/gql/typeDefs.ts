import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  scalar Upload

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type EntityResult {
    messages: [String!]
  }
  type SearchWords {
    id: ID!
    phrase: String!
  }

  type Category {
    id: ID!
    name: String!
  }
  type Photo {
    id: ID!
    url: String!
    review: Review
  }
  type Tag {
    id: ID!
    name: String!
  }

  type CompoundTag {
    count: String!
    name: String!
  }
  type Points {
    id: ID!
    points: Int!
    review: Review
  }

  type Like {
    id: ID!
    like: Boolean!
    user: User!
    review: Review!
  }
  type UserLanguage {
    id: ID!
    userLanguage: String!
    user: User!
  }
  type UserThemeMode {
    id: ID!
    name: String!
    user: User!
  }
  type UserStatus {
    id: ID!
    name: String!
    status: String!
    user: User!
  }

  type Review {
    id: ID!
    title: String!
    body: String!
    authorMark: Int!
    category: Category!
    photos: [Photo]
    tags: [Tag]
    points: [Points]
    likes: [Like]
    user: User!
  }
  type User {
    id: ID!
    email: String!
    userName: String!
    password: String!
    status: UserStatus!
    mode: UserThemeMode!
    language: UserLanguage!
    reviews: [Review]
    likes: [Like]
    lastTimeLogin: Date!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union UserResult = User | EntityResult
  union ReviewResult = Review | EntityResult

  type Query {
    me: UserResult!
    checkEmail(email: String!): String!
    getAllReviews(userId: String): [Review!]
    getSearchReviews(tags: [String!], txt: String): [Review]
    getCompoundTags: [CompoundTag]!
    getAllCategories: [Category]!
    getAllTags: [Tag!]
    getSearchWords: [SearchWords!]
  }

  type Mutation {
    register(email: String!, userName: String!, password: String!): String!
    login(email: String!, password: String!): String!
    logout(email: String!): String!
    autoComplete(txt: String!): String!
    createReview(
      userId: String!
      id: String!
      title: String!
      body: String!
      authorMark: Int
      categoryId: String!
      tags: [String]
    ): EntityResult!
    deleteReview(reviewId: String!): EntityResult!

    singleUpload(file: Upload!): UploadedFileResponse!
    multipleUpload(files: [Upload!]!): UploadedFileResponse!
  }
`;

export default typeDefs;
