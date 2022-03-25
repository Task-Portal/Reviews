import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import RichEditor from "../../editor/RichEditor";

const CardHolder = () => {
  const reviews = useSelector((state: AppState) => state.show);

  const printCards = () => {
    if (reviews && reviews.length > 0) {
      return reviews.map((r) => (
        <>
          {" "}
          <Card border="danger" style={{ width: "18rem" }}>
            <Card.Header>Author: {r.user.userName}</Card.Header>
            <Card.Body>
              <Card.Title>{r.title}</Card.Title>
              <Card.Text>
                {<RichEditor existingBody={r.body + ""} readOnly={true} />}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </>
      ));
    }
    return null;
  };

  return (
    <>
      <Container>{printCards()}</Container>
    </>
  );
};

export default CardHolder;
