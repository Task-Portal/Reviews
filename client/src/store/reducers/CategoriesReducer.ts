import Review from "../../models/Review";
import { ReducerType } from "../ReducerType";
import Tag from "../../models/Tag";
import Category from "../../models/Category";

export interface CategoriesAction {
  type: string;
  payload: Array<Category>;
}

export const CategoriesReducer = (
  state: any = null,
  action: CategoriesAction
): Array<Category> => {
  switch (action.type) {
    case ReducerType.CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
