import { Review } from "./Review";
import { QueryArrayResult } from "../QueryArrayResult";
import { Tag } from "./Tag";

export class ReviewResult {
  constructor(public messages?: Array<string>, public review?: [Review]) {}
}

export const getAllReviews = async (): Promise<QueryArrayResult<Review>> => {
  const reviews = await Review.find({ relations: ["category", "tags"] });
  return {
    entities: reviews,
  };
};

export const getAllTags = async (): Promise<QueryArrayResult<Tag>> => {
  const tags = await Tag.find();
  return {
    entities: tags,
  };
};
