import {gql} from "apollo-server-express";

const typeDefs = gql`
    scalar Date
   

    type EntityResult {
        messages: [String!]
    }

    type User {
        id: ID!
        email: String!
        userName: String!
        password: String!
        lastTimeLogin: Date!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    union UserResult = User | EntityResult



    type Query {
        me: UserResult!
        checkEmail(email: String!): String!
    }

    type Mutation {
        register(email: String!, userName: String!, password: String!): String!
        login(email: String!, password: String!): String!
        logout(email: String!): String!

    }
`;

export default typeDefs;
