import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import RichEditor from "../../editor/RichEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faStar } from "@fortawesome/free-solid-svg-icons";

const CardHolder = () => {
  const reviews = useSelector((state: AppState) => state.show);
  const user = useSelector((state: AppState) => state.user);

  const printCards = () => {
    if (reviews && reviews.length > 0) {
      return reviews.map((r) => (
        <>
          <Card border="danger" key={r.id}>
            <Card.Header>
              <FontAwesomeIcon icon={faPencil} />
              {r.user.userName} {printStart(r.authorMark)}
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>{r.title}</Card.Title>
              <Card.Text>
                {user ? (
                  <div className="review_body_background">
                    <RichEditor existingBody={r.body + ""} readOnly={true} />
                  </div>
                ) : null}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" key={`f${r.id}`}>
              {r.tags.map((t, i) => (
                <span key={`tag${i}`}>
                  {t.name}
                  {"  "}{" "}
                </span>
              ))}
            </Card.Footer>
          </Card>
          <br />
        </>
      ));
    }
    return null;
  };

  const printStart = (num: Number) => {
    return [...Array(num).keys()].map((i) => <FontAwesomeIcon icon={faStar} />);
  };

  return (
    <>
      <Container>{printCards()}</Container>
    </>
  );
};

export default CardHolder;
