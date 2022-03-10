import React, { useMemo, useState } from "react";
import { ReducerType } from "../../../store/ReducerType";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import Review from "../../../models/Review";
import { getReviewsByTags } from "../main/CloudTags";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import _ from "lodash/fp";
import useSearch from "../../../hooks/useSearch";

export const AutoCompleteMutation = gql`
  mutation autoComplete($txt: String!) {
    autoComplete(txt: $txt)
  }
`;

const GetAllWords = gql`
  query getSearchWords {
    getSearchWords {
      phrase
    }
  }
`;

const searchTypes = { tag: "tag", word: "random" };

const Finder = () => {
  const [execAutocomplete] = useMutation(AutoCompleteMutation, {
    refetchQueries: [GetAllWords],
  });
  const { data } = useQuery(GetAllWords);
  const { search } = useSearch();

  const tags = useSelector((state: AppState) => state.tags);
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    Array<{ id: string; name: string; desc: string }>
  >([]);

  const tagObjects = useMemo(
    () => getTagsObjects(tags, searchTypes.tag),
    [tags]
  );
  const wordObjects = useMemo(
    () =>
      getTagsObjects(
        data?.getSearchWords.map((f) => f.phrase),
        searchTypes.word
      ),
    [data]
  );
  const items = useMemo(
    () => _.concat(tagObjects, wordObjects),
    [tagObjects, wordObjects]
  );

  const onClick = async () => {
    await search({
      variables: {
        txt: searchTxt.trim(),
        tags: selectedTags.length > 0 ? selectedTags?.map((t) => t.name) : tags,
      },
    });

    if (searchTxt.length > 2) {
      await execAutocomplete({
        variables: {
          txt: searchTxt.trim(),
        },
      });
    }
  };

  const formatResult = (item) => {
    return (
      <span className="autoCompleteResults">
        {item.desc === searchTypes.tag ? "tag: " : ""} {item.name}
      </span>
    );
  };

  const handleOnSelect = (e) => {
    if (e.desc !== searchTypes.word) {
      if (!selectedTags.some((f) => f.name === e.name)) {
        setSelectedTags([...selectedTags, e]);
      }
    } else {
      setSearchTxt(e.name);
    }
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

const getTagsObjects = (entity, type) => {
  let count = 0;
  return entity?.map((t) => {
    return {
      id: `${type}.${count++}`,
      name: t,
      desc: type,
    };
  });
};
