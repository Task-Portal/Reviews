import { combineReducers } from "redux";
import { UserProfileReducer } from "./user/UserReducer";
import {ReviewsDataReducer} from "./reviewsData/ReviewsDataReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
  reviews:ReviewsDataReducer,

});

export type AppState = ReturnType<typeof rootReducer>;
