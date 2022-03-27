import { gql, QueryLazyOptions, useLazyQuery } from "@apollo/client";
import { ReducerType } from "../store/ReducerType";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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
  const [search, { data, loading }] = useLazyQuery(GetSearchReviews);
  const dispatch = useDispatch();

  if (!loading && data && data.getSearchReviews) {
    console.log("Reviews from search: ", data.getSearchReviews);
    dispatch({
      type: ReducerType.SHOW_REVIEW_TYPE,
      payload: data.getSearchReviews,
    });
  }
  return { search };
};
export default useSearch;
