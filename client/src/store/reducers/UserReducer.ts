import User from "../../models/User";
import { ReducerType } from "../ReducerType";

export interface UserProfileAction {
  type: string;
  payload: User | null;
}

export const UserProfileReducer = (
  state: any = null,
  action: UserProfileAction
): User | null => {
  switch (action.type) {
    case ReducerType.USER_PROFILE_SET:
      return action.payload;
    default:
      return state;
  }
};
