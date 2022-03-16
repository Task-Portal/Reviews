import { combineReducers } from "redux";
import { UserProfileReducer } from "./reducers/UserReducer";
import { ShowReviewReducer } from "./reducers/ShowReivewsReducer";
import { TagReducer } from "./reducers/TagsReducer";
import { CreateReviewReducer } from "./reducers/CreateReviewReducer";
import { CategoriesReducer } from "./reducers/CategoriesReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
  show: ShowReviewReducer,
  tags: TagReducer,
  createReview: CreateReviewReducer,
  categories: CategoriesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
