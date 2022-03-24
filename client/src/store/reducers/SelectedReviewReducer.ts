import Review from "../../models/Review";
import { ReducerType } from "../ReducerType";
import Tag from "../../models/Tag";
import Category from "../../models/Category";

export interface SelectedReviewAction {
  type: string;
  payload: Review | null;
}

export const SelectedReviewReducer = (
  state: any = null,
  action: SelectedReviewAction
): Review | null => {
  switch (action.type) {
    case ReducerType.SELECTED_REVIEW:
      return action.payload;
    default:
      return state;
  }
};
