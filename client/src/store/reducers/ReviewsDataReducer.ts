import Review from "../../models/Review";
import { ReducerType } from "../ReducerType";

// export const ReviewsDateType = {  REVIEWS_DATE_TYPE:"REVIEWS_DATE_TYPE"};

export interface ReviewsDataAction {
  type: string;
  payload: Array<Review> | null;
}

export const ReviewsDataReducer = (
  state: any = null,
  action: ReviewsDataAction
): Array<Review> | null => {
  switch (action.type) {
    case ReducerType.REVIEWS_DATE_TYPE:
      return action.payload;
    default:
      return state;
  }
};
