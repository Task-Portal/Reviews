import React, {useEffect, useState} from "react";
import "./App.scss";
import {Route, Switch} from "react-router-dom";
import Home from "./components/routes/Home";
import {useDispatch} from "react-redux";
import {gql, useQuery} from "@apollo/client";
import {ReviewsDateType} from "./store/reviewsData/ReviewsDataReducer";
import Review from "./models/Review";

const GetAllReviews = gql`
    query getAllReviews {
        getAllReviews {
            id
            body
            title
            authorMark
#            category {
#                name
#            }
        }
    }
`;

function App() {

    const dispatch = useDispatch();

    const [reviews, setReviews] = useState<Array<Review>>([])
     const { loading, error, data } = useQuery(GetAllReviews);
    useEffect(() => {
        console.log("ReviewsData: ", data)
        console.log("Error: ", error)
        console.log("Loading: ", loading)
        if (!loading)
        setReviews(data)

    }, [data]);

    const {data: reviewsDate} = useQuery(GetAllReviews, {
        pollInterval: 5000,
        nextFetchPolicy: "network-only",
        onCompleted: (data) => {

            dispatch({
                type: ReviewsDateType.REVIEWS_DATE_TYPE,
                payload: reviewsDate,
            });


        }

    });

    const renderHome = (props: any) => <Home {...props} />;

    return (
        <Switch>
            <Route exact={true} path="/" render={renderHome}/>
        </Switch>
    );
}

export default App;
