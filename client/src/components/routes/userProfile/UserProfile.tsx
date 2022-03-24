import React, { FC, useEffect } from "react";
import MyNav from "../../areas/nav/MyNav";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import { ReducerType } from "../../../store/ReducerType";
import Table from "../../areas/main/Table";
import Container from "react-bootstrap/Container";
import CrudButtons from "../../areas/userProfile/CrudButtons";
import { useQuery } from "@apollo/client";
import { GetAllReviews } from "../../../App";

const UserProfile: FC = () => {
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GetAllReviews, {
    variables: { userId: user?.id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && data.getAllReviews) {
      console.log("");
      dispatch({
        type: ReducerType.SHOW_REVIEW_TYPE,
        payload: data.getAllReviews,
      });
    }
  }, [data]);

  return (
    <>
      <MyNav />
      <Container>
        <CrudButtons />
        <Table />
      </Container>
    </>
  );
};

export default UserProfile;
