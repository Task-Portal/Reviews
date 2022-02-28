import Review from "../../models/Review";
import { ReducerType } from "../ReducerType";

// export const ShowReviewsType = { SHOW_REVIEW_TYPE: "SHOW_REVIEW_TYPE" };

export interface ShowReviewAction {
  type: string;
  payload: Array<Review> | null;
}

export const ShowReviewReducer = (
  state: any = null,
  action: ShowReviewAction
): Array<Review> | null => {
  switch (action.type) {
    case ReducerType.SHOW_REVIEW_TYPE:
      return action.payload;
    default:
      return state;
  }
};
