import { IResolvers } from "apollo-server-express";

import { User } from "../repo/user/User";
import {
  checkEmailInDb,
  login,
  logout,
  me,
  register,
  UserResult,
} from "../repo/user/UserRepo";
import { GqlContext } from "./GqlContext";
import { QueryArrayResult } from "../repo/QueryArrayResult";
import { getAllReviews, getAllTags } from "../repo/review/ReviewRepo";
import { Review } from "../repo/review/Review";
import { Tag } from "../repo/review/Tag";
import { getAllWords, saveSearchTxt } from "../repo/searchWord/SearchWordRepo";
import { SearchWords } from "../repo/searchWord/SearchWords";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}
const STANDARD_ERROR = "An error has occurred";

interface EntityResult {
  messages: Array<string>;
}

const resolvers: IResolvers = {
  UserResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "User";
    },
  },
  ReviewResult: {
    __resolveType(obj: any, context: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Review";
    },
  },

  Query: {
    me: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<User | EntityResult> => {
      let user: UserResult;
      try {
        if (!ctx.req.session?.userId) {
          return {
            messages: ["User not logged in."],
          };
        }
        user = await me(ctx.req.session.userId);
        if (user && user.user) {
          return user.user;
        }
        return {
          messages: user.messages ? user.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    checkEmail: async (
      obj: any,
      args: { email: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      try {
        return await checkEmailInDb(args.email);
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    getAllReviews: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<Array<Review> | EntityResult> => {
      let reviews: QueryArrayResult<Review>;

      try {
        reviews = await getAllReviews();
        if (reviews.entities) {
          return reviews.entities;
        }
        return {
          messages: reviews.messages ? reviews.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    getAllTags: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<Array<Tag> | EntityResult> => {
      let tags: QueryArrayResult<Tag>;

      try {
        tags = await getAllTags();
        if (tags.entities) {
          return tags.entities;
        }
        return {
          messages: tags.messages ? tags.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
    getSearchWords: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<Array<SearchWords> | EntityResult> => {
      let words: QueryArrayResult<SearchWords>;

      try {
        words = await getAllWords();
        if (words.entities) {
          return words.entities;
        }
        return {
          messages: words.messages ? words.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        throw ex;
      }
    },
  },
  Mutation: {
    register: async (
      obj: any,
      args: { email: string; userName: string; password: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      let user: UserResult;
      try {
        user = await register(args.email, args.userName, args.password);
        if (user && user.user) {
          return "Registration successful.";
        }
        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        throw ex;
      }
    },
    login: async (
      obj: any,
      args: { email: string; password: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      let user: UserResult;

      try {
        user = await login(args.email, args.password);
        if (user && user.user) {
          ctx.req.session!.userId = user.user.id;
          return `Login successful.`;
        }
        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        throw ex;
      }
    },
    logout: async (
      obj: any,
      args: { email: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      try {
        let result = await logout(args.email);
        ctx.req.session?.destroy((err: any) => {
          if (err) {
            console.log("destroy session failed");
            return;
          }
          console.log(
            "session destroyed resolvers 129",
            ctx.req.session?.userId
          );
        });
        return result;
      } catch (ex) {
        throw ex;
      }
    },
    autoComplete: async (
      obj: any,
      args: { txt: string },
      ctx: GqlContext,
      info: any
    ): Promise<string> => {
      try {
        return await saveSearchTxt(args.txt);
      } catch (ex) {
        throw ex;
      }
    },
  },
};

export default resolvers;
