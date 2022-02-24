import { combineReducers } from "redux";
import { UserProfileReducer } from "./user/UserReducer";
import {UsersDataReducer} from "./usersData/UsersDataReducer";
import {SelectedCboxReducer} from "./selectedCheckboxes/selectedCboxReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
  users:UsersDataReducer,
  selectedCbox:SelectedCboxReducer
});

export type AppState = ReturnType<typeof rootReducer>;
