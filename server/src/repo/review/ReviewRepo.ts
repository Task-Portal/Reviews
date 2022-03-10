import { Review } from "./Review";
import { QueryArrayResult } from "../QueryArrayResult";
// import { getConnection, In, Like } from "typeorm";
import { Brackets, getConnection } from "typeorm";

export class ReviewResult {
  constructor(public messages?: Array<string>, public review?: [Review]) {}
}

export type tagCompoundObj = { count: string; title: string };

export const getAllReviews = async (): Promise<QueryArrayResult<Review>> => {
  const reviews = await Review.find({
    relations: ["category", "tags", "user"],
  });
  return {
    entities: reviews,
  };
};

export const getAllTags = async (): Promise<Array<tagCompoundObj>> => {
  const connection = getConnection();
  return await connection.query(`select  count("tagsId") , T."Title" as title from "Review"
inner join review_tags_tags rtt on "Review"."Id" = rtt."reviewId"
inner join "Tags" T on T."Id" = rtt."tagsId"
group by T."Title"`);
};

export const getSearchReviews = async (
  tags: Array<string>,
  txt: string | null
): Promise<QueryArrayResult<Review>> => {
  console.log("txt: ", txt);
  console.log("txt: ", tags);

  if (txt == undefined) {
    return await getReviewsByTag(tags);
  }
  const reviews = await getConnection()
    .createQueryBuilder()
    .select([
      "rev.id",
      "rev.title",
      "rev.body",
      "rev.authorMark",
      "tags.title",
      "cat.name",
      "u.id",
      "u.userName",
    ])
    .from(Review, "rev")
    .innerJoin("rev.tags", "tags")
    .innerJoin("rev.category", "cat")
    .innerJoin("rev.user", "u")
    .where("tags.title IN (:...t)", { t: tags })
    .andWhere(
      new Brackets((qb) => {
        qb.where("rev.body Ilike :body", { body: `%${txt}%` }).orWhere(
          "rev.title Ilike :title",
          { title: `%${txt}%` }
        );
      })
    )
    .getMany();
  console.log("reviews: ", reviews);
  return {
    entities: reviews,
  };
};

const getReviewsByTag = async (tags: Array<string>) => {
  const reviews = await getConnection()
    .createQueryBuilder()
    .select([
      "rev.id",
      "rev.title",
      "rev.body",
      "rev.authorMark",
      "tags.title",
      "cat.name",
      "u.id",
      "u.userName",
    ])
    .from(Review, "rev")
    .innerJoin("rev.tags", "tags")
    .innerJoin("rev.category", "cat")
    .innerJoin("rev.user", "u")
    .where("tags.title IN (:...t)", { t: tags })
    .getMany();

  return {
    entities: reviews,
  };
};
