import React from "react";
import Table from "./Table";
import CloudTags from "./CloudTags";
import Container from "react-bootstrap/Container";

const Main = () => {
  return (
    <Container>
      <CloudTags />
      <Table />;
    </Container>
  );
};

export default Main;
