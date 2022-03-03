import React, { useMemo, useState } from "react";
import { ReducerType } from "../../../store/ReducerType";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Button, ButtonGroup, Form } from "react-bootstrap";
// import classNames from "classnames";

const Finder = () => {
  const data = useSelector((state: AppState) => state.reviews);
  const tags = useSelector((state: AppState) => state.tags);
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    Array<{ id: string; name: string; desc: string }>
  >([]);

  const dispatch = useDispatch();
  const items = useMemo(() => getTagsObjects(tags), [tags]);

  const onClick = () => {
    const reviews = getFilteredReviews(data, searchTxt);
    dispatch({ type: ReducerType.SHOW_REVIEW_TYPE, payload: reviews });
  };

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        name: {item.name} id: {item.id}
      </span>
    );
  };

  const handleOnSelect = (e) => {
    // if (selectedTags.length === 0 || selectedTags.some((f) => f.name === e))
    //Todo fix adding duplicates
    let arr = selectedTags;

    console.log("E: ", e);
    if (arr.length === 0 || arr.some((t) => t.name.startsWith(e.name)))
      setSelectedTags([...selectedTags, e]);
  };

  const tagHandler = (e) => {
    let t = selectedTags.filter((f) => f.name !== e);
    setSelectedTags(t);
  };

  return (
    <>
      <ButtonGroup>
        {selectedTags.map((t, index) => (
          <Button
            key={index}
            size="sm"
            style={{
              background: "lightyellow",
              padding: 0,
              marginRight: 1,
              color: "black",
            }}
            // name={t.name}
            onClick={() => tagHandler(t.name)}
          >
            {t.name}
          </Button>
        ))}
      </ButtonGroup>
      <div style={{ width: 325 }}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={setSearchTxt}
          onSelect={handleOnSelect}
          autoFocus
          formatResult={formatResult}
        />
      </div>
      <Form className="d-flex ms-1">
        <Button variant="outline-warning" onClick={onClick}>
          Search
        </Button>
      </Form>
    </>
  );
};

export default Finder;

const getTagsObjects = (tags) => {
  let count = 0;
  if (tags != undefined && tags.length > 0)
    return tags.map((t) => {
      return { id: `t${count++}`, name: t, desc: "tags" };
    });
};

const getFilteredReviews = (data, searchTxt) => {
  return data?.filter((f) => {
    return (
      f.title.toLowerCase().includes(searchTxt.toLowerCase()) ||
      f.body?.includes(searchTxt.toLowerCase())
    );
  });
};
