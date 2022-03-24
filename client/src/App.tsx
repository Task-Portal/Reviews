import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Home from "./components/routes/Home";
import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import Review from "./models/Review";
import { ReducerType } from "./store/ReducerType";
import UserProfile from "./components/routes/userProfile/UserProfile";
import PrivateRoute from "./components/routes/PrivateRoute";
import CreateReview from "./components/routes/crudButtons/CreateReview/CreateReview";
import EditReview from "./components/routes/crudButtons/EditReview";
export const GetAllReviews = gql`
  query getAllReviews($userId: String) {
    getAllReviews(userId: $userId) {
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

export const GetAllCategories = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

function App() {
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState<Array<Review>>([]);
  const { loading, data } = useQuery(GetAllReviews);
  const {
    loading: catLoading,
    data: categories,
    error,
  } = useQuery(GetAllCategories);
  useEffect(() => {
    if (!loading) {
      setReviews(data.getAllReviews);
      dispatch({
        type: ReducerType.SHOW_REVIEW_TYPE,
        payload: data.getAllReviews,
      });
    }
  }, [data]);

  if (error) {
    console.log("Error1: ", error);
  }
  useEffect(() => {
    if (!catLoading) {
      console.log("Categories: ", categories);
      dispatch({
        type: ReducerType.CATEGORIES,
        payload: categories.getAllCategories,
      });
    }
  }, [categories]);

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
  const renderUserProfile = (props: any) => <UserProfile {...props} />;
  const renderCreateReview = (props: any) => <CreateReview {...props} />;
  const renderEditReview = (props: any) => <EditReview {...props} />;

  return (
    <Switch>
      <Route exact={true} path="/" render={renderHome} />
      <PrivateRoute path="/up/:id" component={renderUserProfile} exact />
      <PrivateRoute path="/create/:id" component={renderCreateReview} exact />
      <PrivateRoute path="/edit/:id" component={renderEditReview} exact />
    </Switch>
  );
}

export default App;
