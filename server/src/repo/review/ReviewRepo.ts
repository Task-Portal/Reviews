import { Review } from "./Review";
import { QueryArrayResult } from "../QueryArrayResult";
// import { getConnection, In, Like } from "typeorm";
import { Brackets, getConnection } from "typeorm";
import { Tag } from "./Tag";
import { User } from "../user/User";
import { Category } from "./Category";
import { EntityResult } from "../../gql/resolvers";

export class ReviewResult {
  constructor(public messages?: Array<string>, public review?: Review) {}
}

export type tagCompoundObj = { count: string; name: string };

// const MSG_SUCCESS = "Review successfully created";
// const MSG_ERROR = "Review was not created";

export const getAllReviews = async (
  userId?: string
): Promise<QueryArrayResult<Review>> => {
  let reviews: Review[] = [];
  if (userId) {
    reviews = await Review.find({
      relations: ["category", "tags", "user"],
      where: { user: { id: userId } },
    });
  } else {
    reviews = await Review.find({
      relations: ["category", "tags", "user"],
    });
  }
  return {
    entities: reviews,
  };
};

export const getCompoundTags = async (): Promise<Array<tagCompoundObj>> => {
  const connection = getConnection();
  return await connection.query(`select  count("tagsId") , T."Name" as name from "Review"
inner join review_tags_tags rtt on "Review"."Id" = rtt."reviewId"
inner join "Tags" T on T."Id" = rtt."tagsId"
group by T."Name"`);
};

export const getSearchReviews = async (
  tags: Array<string>,
  txt: string | null
): Promise<QueryArrayResult<Review>> => {
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
      "tags.name",
      "cat.name",
      "u.id",
      "u.userName",
    ])
    .from(Review, "rev")
    .innerJoin("rev.tags", "tags")
    .innerJoin("rev.category", "cat")
    .innerJoin("rev.user", "u")
    .where("tags.name IN (:...t)", { t: tags })
    .andWhere(
      new Brackets((qb) => {
        qb.where("rev.body Ilike :body", { body: `%${txt}%` }).orWhere(
          "rev.title Ilike :title",
          { title: `%${txt}%` }
        );
      })
    )
    .getMany();
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
      "tags.name",
      "cat.name",
      "u.id",
      "u.userName",
    ])
    .from(Review, "rev")
    .innerJoin("rev.tags", "tags")
    .innerJoin("rev.category", "cat")
    .innerJoin("rev.user", "u")
    .where("tags.name IN (:...t)", { t: tags })
    .getMany();

  return {
    entities: reviews,
  };
};

export const getAllTags = async (): Promise<QueryArrayResult<Tag>> => {
  let tags = await Tag.find();
  return {
    entities: tags,
  };
};

export const createReview = async (
  userId: string,
  id: string,
  title: string,
  body: string,
  tags: Array<string>,
  categoryId: string,
  authorMark: number
  // photos: Array<Photo>
): Promise<ReviewResult> => {
  const t = await Tag.findByIds(tags);
  const u = await User.findOne(userId);
  const c = await Category.findOne(categoryId);

  // review.photos = photos;
  try {
    const review = new Review();
    review.id = id;
    review.user = u!;
    review.title = title;
    review.body = body;
    review.tags = t;
    review.category = c!;
    review.authorMark = authorMark;

    const reviewEntity = await Review.create(review).save();

    if (!reviewEntity) {
      return {
        messages: ["Review was not created"],
      };
    }

    return {
      review: reviewEntity,
    };
  } catch (e) {
    console.error("Error: ", e);
    return { messages: [e] };
  }
};

export const deleteReview = async (reviewId: string): Promise<EntityResult> => {
  await Review.delete({ id: reviewId });
  return {
    messages: ["Deleted successfully..."],
  };
};
