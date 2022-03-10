import React, { FC, useEffect } from "react";
import MyNav from "../../areas/nav/MyNav";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import { ReducerType } from "../../../store/ReducerType";
import Table from "../../areas/main/Table";
import Container from "react-bootstrap/Container";
import CrudButtons from "../../areas/userProfile/CrudButtons";

const UserProfile: FC = () => {
  // const reviews = useSelector((state: AppState) => state.reviews);
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let r = reviews?.filter((r) => r.user.id === user?.id);
  //   console.log(r);
  //   dispatch({ type: ReducerType.SHOW_REVIEW_TYPE, payload: r });
  // }, [reviews]);

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
