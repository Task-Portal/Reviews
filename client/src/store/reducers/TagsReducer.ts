import Review from "../../models/Review";
import { ReducerType } from "../ReducerType";
import Tag from "../../models/Tag";

export interface TagAction {
  type: string;
  payload: Array<string>;
}

export const TagReducer = (
  state: any = null,
  action: TagAction
): Array<string> => {
  switch (action.type) {
    case ReducerType.TAGS:
      return action.payload;
    default:
      return state;
  }
};
