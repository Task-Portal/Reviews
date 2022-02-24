import User from "../../models/User";

export const UsersDateType = {  USERS_DATE_TYPE:"USERS_DATE_TYPE"};

export interface UsersDataAction {
  type: string;
  payload: Array<User> | null;
}

export const UsersDataReducer = (
    state: any = null,
    action: UsersDataAction
): Array<User> | null => {
  switch (action.type) {
    case UsersDateType.USERS_DATE_TYPE:
      return action.payload;
    default:
      return state;
  }
};
