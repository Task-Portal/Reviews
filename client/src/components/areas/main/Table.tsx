import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Review from "../../../models/Review";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import RichEditor from "../../editor/RichEditor";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import { ReducerType } from "../../../store/ReducerType";

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

// const defaultSorted = [
//   {
//     dataField: "name", // if dataField is not match to any column you defined, it will be ignored.
//     order: "desc", // desc or asc
//   },
// ];

const Table = () => {
  const reviewsState = useSelector((state: AppState) => state.show);
  const user = useSelector((state: AppState) => state.user);
  const [data, setData] = useState<Array<Review>>([]);
  const [selectedCbox, setSelectedCbox] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (reviewsState) {
      setData(reviewsState);
    }
  }, [reviewsState]);

  const expandRow = {
    renderer: (row) =>
      user ? (
        <div className="review_body_background">
          <RichEditor
            existingBody={row.body}
            readOnly={true}
            // sendOutBody={receiveBody}
          />
        </div>
      ) : (
        <span style={{ background: "yellow" }}>
          First login to see description
        </span>
      ),

    // nonExpandable: ["1"],
  };
  const selectRow: SelectRowProps<any> = {
    mode: "checkbox",
    clickToSelect: false,
    hideSelectAll: true,
    clickToExpand: true,
    onSelect: (row, isSelect) => {
      dispatch({
        type: ReducerType.SELECTED_REVIEW,
        payload: isSelect ? data.filter((f) => f.id === row.id)[0] : null,
      });
      isSelect ? setSelectedCbox(row.id) : setSelectedCbox("");
    },
    selected: [selectedCbox],
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
      selectRow={selectRow}
    />
  ) : null;
};

export default Table;
