import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import { useMutation } from "@apollo/client";
import { Create, DeleteReview } from "../../../gql/gql_functions";
import Review from "../../../models/Review";
import { ReducerType } from "../../../store/ReducerType";

const btnTypes = { create: "create", edit: "edit", delete: "delete" };

const CrudButtons = () => {
  const history = useHistory();
  const user = useSelector((state: AppState) => state.user);
  const selectedReview = useSelector((state: AppState) => state.selectedReview);
  const reviews = useSelector((state: AppState) => state.show);
  const [execDelete] = useMutation(DeleteReview);
  const dispatch = useDispatch();

  const btnHandler = async (e) => {
    let btn = e.currentTarget.name;

    if (btn === btnTypes.create) {
      history.push(`/create/${user?.id}`);
    } else if (btn === btnTypes.edit) {
      history.push(`/edit/${user?.id}`);
    } else {
      const variables = { reviewId: selectedReview?.id };
      const result = await execDelete({ variables });
      if (result.data.deleteReview.messages[0] === "Deleted successfully...") {
        let newReviews: Review[] = [];
        reviews?.forEach((f) => {
          if (f.id !== selectedReview?.id) {
            newReviews.push(f);
          }
        });
        dispatch({
          type: ReducerType.SHOW_REVIEW_TYPE,
          payload: newReviews,
        });
      }
    }
  };

  return (
    <ButtonGroup className="buttons">
      <Button variant="secondary" name={btnTypes.create} onClick={btnHandler}>
        Create
      </Button>
      <Button
        variant="secondary"
        name={btnTypes.edit}
        onClick={btnHandler}
        disabled={!selectedReview}
      >
        Edit
      </Button>
      <Button
        variant="secondary"
        name={btnTypes.delete}
        onClick={btnHandler}
        disabled={!selectedReview}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
};

export default CrudButtons;
