import { QueryArrayResult } from "../QueryArrayResult";
import { Category } from "./Category";

export const getAllCategories = async (): Promise<
  QueryArrayResult<Category>
> => {
  let categories: Category[] = [];

  categories = await Category.find();

  return {
    entities: categories,
  };
};
