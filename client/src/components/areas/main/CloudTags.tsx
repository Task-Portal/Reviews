import React, { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import Review from "../../../models/Review";
import { ReducerType } from "../../../store/ReducerType";
import cn from "classnames";
import useSearch from "../../../hooks/useSearch";

const GetCompoundTags = gql`
  query GetCompoundTags {
    getCompoundTags {
      count
      name
    }
  }
`;

const allTags = { value: "All", count: 3, key: "All12" };
type arrTags = { value: string; count: number; key: string };

const CloudTags = () => {
  const [tags, setTags] = useState<Array<arrTags>>([]);
  const { loading, error, data } = useQuery(GetCompoundTags);
  const [selectedTag, setSelectedTag] = useState("");
  const dispatch = useDispatch();
  const { search } = useSearch();

  if (error) {
    console.log("Cloud tag error: ", error);
  }

  useEffect(() => {
    if (!loading) {
      let createdTags = data?.getCompoundTags.map((t) => {
        return { value: t.name, key: t.id, count: t.count };
      });

      dispatch({
        type: ReducerType.TAGS,
        payload: [...data?.getCompoundTags.map((t) => t.name)],
      });

      createdTags.push({
        value: allTags.value,
        key: allTags.key,
        count: allTags.count,
      });

      setTags(createdTags);
    }
  }, [data]);

  const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        fontSize: size,
        border: `2px solid ${color}`,
      }}
      className={cn("onHover", { onSelected: selectedTag === tag.value })}
    >
      {tag.value}
    </span>
  );

  const onClick = async ({ value }) => {
    setSelectedTag(value);

    await search({
      variables: {
        tags:
          value === allTags.value
            ? tags.map((f) => f.value).filter((f) => f !== allTags.value)
            : [value],
      },
    });
  };

  return tags.length > 0 ? (
    <TagCloud
      className="tabCloud"
      minSize={15}
      maxSize={30}
      tags={tags}
      renderer={customRenderer}
      onClick={(tag) => onClick(tag)}
    />
  ) : null;
};

export default CloudTags;

export const getReviewsByTags = (reviews: Array<Review>, value: string) => {
  let arr: Array<Review> = [];
  reviews.forEach((r) =>
    r.tags.forEach((t) => {
      if (t.name === value) {
        arr.push(r);
      }
    })
  );
  return arr;
};
