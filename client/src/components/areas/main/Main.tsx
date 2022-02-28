import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Container from "react-bootstrap/Container";
import Review from "../../../models/Review";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";

const columns = [
  {
    dataField: "title",
    text: "Title",
    sort: true,
  },
  {
    dataField: "category.name",
    text: "Category",
    sort: true,
  },
  {
    dataField: "authorMark",
    text: "Author Mark",
    sort: true,
  },
];

const Main = () => {
  const reviewsState = useSelector((state: AppState) => state.show);
  const user = useSelector((state: AppState) => state.user);
  const [data, setData] = useState<Array<Review>>([]);

  useEffect(() => {
    if (reviewsState) {
      console.log("ReviewsState: ", reviewsState);
      setData(reviewsState);
    }
  }, [reviewsState]);

  const expandRow = {
    renderer: (row) =>
      user ? (
        <div className="review_body_background">{row.body}</div>
      ) : (
        <span style={{ background: "yellow" }}>
          First login to see description
        </span>
      ),

    // nonExpandable: ["1"],
  };

  // const afterFilter = (newResult, newFilters) => {
  //   console.log(newResult);
  //   console.log(newFilters);
  // };

  return data.length > 0 ? (
    <Container>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={data!}
        columns={columns}
        classes="format_table"
        bordered={false}
        expandRow={expandRow}
        // filter={filterFactory(afterFilter)}
      />
    </Container>
  ) : null;
};

export default Main;
