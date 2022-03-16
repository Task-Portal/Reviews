import { gql, QueryLazyOptions, useLazyQuery } from "@apollo/client";
import { ReducerType } from "../store/ReducerType";
import { useDispatch } from "react-redux";

const GetSearchReviews = gql`
  query getSearchReviews($txt: String, $tags: [String!]) {
    getSearchReviews(txt: $txt, tags: $tags) {
      id
      body
      title
      authorMark
      category {
        name
      }
      tags {
        name
      }
      user {
        id
        userName
      }
    }
  }
`;

type searchParams = {
  txt?: string;
  tags: string[];
};

interface UseSearchProps {
  search: (options?: QueryLazyOptions<searchParams>) => void;
}

const useSearch = (): UseSearchProps => {
  const [search, { data }] = useLazyQuery(GetSearchReviews);
  const dispatch = useDispatch();

  if (data && data.getSearchReviews) {
    dispatch({
      type: ReducerType.SHOW_REVIEW_TYPE,
      payload: data.getSearchReviews,
    });
  }
  return { search };
};
export default useSearch;
