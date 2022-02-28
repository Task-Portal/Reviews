import { gql, QueryLazyOptions, useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReducerType } from "../store/ReducerType";

export const Me = gql`
  query me {
    me {
      ... on EntityResult {
        messages
      }
      ... on User {
        id
        userName
        email
      }
    }
  }
`;

interface UseRefreshReduxMeResult {
  execMe: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
  deleteMe: () => void;
  updateMe: () => void;
}

const useRefreshReduxMe = (): UseRefreshReduxMeResult => {
  const [execMe, { data }] = useLazyQuery(Me);
  const reduxDispatcher = useDispatch();
  const history = useHistory();

  const deleteMe = () => {
    reduxDispatcher({
      type: ReducerType.USER_PROFILE_SET,
      payload: null,
    });
    history.replace(`/`);
  };
  const updateMe = () => {
    if (data && data.me && data.me.userName) {
      reduxDispatcher({
        type: ReducerType.USER_PROFILE_SET,
        payload: data.me,
      });
      history.push(`/`);
    }
  };

  return { execMe, deleteMe, updateMe };
};
export default useRefreshReduxMe;
