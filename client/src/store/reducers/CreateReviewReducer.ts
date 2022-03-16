import { CreateReviewType } from "../ReducerType";

export const CreateReviewReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case CreateReviewType.USER_ID:
      return { ...state, userId: action.payload };
    case CreateReviewType.TITLE:
      return { ...state, title: action.payload };
    case CreateReviewType.BODY:
      return { ...state, body: action.payload };
    case CreateReviewType.BODY_NODE:
      return { ...state, bodyNode: action.payload };
    case CreateReviewType.CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};
