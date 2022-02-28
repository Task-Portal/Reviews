import { combineReducers } from "redux";
import { UserProfileReducer } from "./reducers/UserReducer";
import { ReviewsDataReducer } from "./reducers/ReviewsDataReducer";
import { ShowReviewReducer } from "./reducers/ShowReivewsReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
  reviews: ReviewsDataReducer,
  show: ShowReviewReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
