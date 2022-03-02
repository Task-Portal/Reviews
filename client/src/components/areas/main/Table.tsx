import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Review from "../../../models/Review";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import BootstrapTable from "react-bootstrap-table-next";

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

const Table = () => {
  const reviewsState = useSelector((state: AppState) => state.show);
  const user = useSelector((state: AppState) => state.user);
  const [data, setData] = useState<Array<Review>>([]);

  useEffect(() => {
    if (reviewsState) {
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

  return data.length > 0 ? (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={data!}
      columns={columns}
      classes="format_table"
      bordered={false}
      expandRow={expandRow}
    />
  ) : null;
};

export default Table;
