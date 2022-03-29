import React from "react";
import CloudTags from "./CloudTags";
import Container from "react-bootstrap/Container";
import CardHolder from "./CardHolder";

const Main = () => {
  return (
    <Container>
      <CloudTags />
      {/*<Table />;*/}
      <CardHolder />
    </Container>
  );
};

export default Main;
