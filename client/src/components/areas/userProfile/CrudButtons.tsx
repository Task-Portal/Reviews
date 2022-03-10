import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const btnTypes = { create: "create", edit: "edit", delete: "delete" };

const CrudButtons = () => {
  const btnHandler = (e) => {
    let btn = e.currentTarget.name;

    if (btn === btnTypes.create) {
      console.log(btnTypes.create);
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
