import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Home from "./components/routes/Home";
import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import Review from "./models/Review";
import { ReducerType } from "./store/ReducerType";

const GetAllReviews = gql`
  query getAllReviews {
    getAllReviews {
      id
      body
      title
      authorMark
      category {
        name
      }
      tags {
        title
      }
    }
  }
`;

function App() {
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState<Array<Review>>([]);
  const { loading, error, data } = useQuery(GetAllReviews);
  useEffect(() => {
    if (!loading) {
      setReviews(data.getAllReviews);
      dispatch({
        type: ReducerType.SHOW_REVIEW_TYPE,
        payload: data.getAllReviews,
      });
      dispatch({
        type: ReducerType.REVIEWS_DATE_TYPE,
        payload: data.getAllReviews,
      });
    }
  }, [data]);

  // const {data: reviewsDate} = useQuery(GetAllReviews, {
  //     pollInterval: 5000,
  //     nextFetchPolicy: "network-only",
  //     onCompleted: (data) => {
  //         dispatch({
  //             type: ReducerTypes.REVIEWS_DATE_TYPE,
  //             payload: reviewsDate,
  //         });
  //     }
  // });

  const renderHome = (props: any) => <Home {...props} />;

  return (
    <Switch>
      <Route exact={true} path="/" render={renderHome} />
    </Switch>
  );
}

export default App;
