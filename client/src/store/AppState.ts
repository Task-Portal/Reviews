import { combineReducers } from "redux";
import { UserProfileReducer } from "./reducers/UserReducer";
import { ReviewsDataReducer } from "./reducers/ReviewsDataReducer";
import { ShowReviewReducer } from "./reducers/ShowReivewsReducer";
import { TagReducer } from "./reducers/TagsReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
  reviews: ReviewsDataReducer,
  show: ShowReviewReducer,
  tags: TagReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
