import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";

const btnTypes = { create: "create", edit: "edit", delete: "delete" };

const CrudButtons = () => {
  const history = useHistory();
  const user = useSelector((state: AppState) => state.user);

  const btnHandler = (e) => {
    let btn = e.currentTarget.name;

    if (btn === btnTypes.create) {
      history.push(`/create/${user?.id}`);
    } else if (btn === btnTypes.edit) {
      console.log(btnTypes.edit);
    } else {
      console.log(btnTypes.delete);
    }
  };

  return (
    <ButtonGroup className="crudBtn">
      <Button variant="secondary" name={btnTypes.create} onClick={btnHandler}>
        Create
      </Button>
      <Button variant="secondary" name={btnTypes.edit} onClick={btnHandler}>
        Edit
      </Button>
      <Button variant="secondary" name={btnTypes.delete} onClick={btnHandler}>
        Delete
      </Button>
    </ButtonGroup>
  );
};

export default CrudButtons;
