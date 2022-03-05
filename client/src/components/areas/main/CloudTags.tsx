import React, { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { gql, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import Review from "../../../models/Review";
import { ReducerType } from "../../../store/ReducerType";
import cn from "classnames";
import Tag from "../../../models/Tag";

const GetAllTags = gql`
  query GetAllTags {
    getAllTags {
      id
      title
    }
  }
`;

const allTags = { value: "All", count: 3, key: "All12" };

const CloudTags = () => {
  const reviews = useSelector((state: AppState) => state.reviews);
  const [tags, setTags] = useState<Array<object>>([]);
  const { loading, error, data } = useQuery(GetAllTags);
  const [selectedTag, setSelectedTag] = useState("");
  const dispatch = useDispatch();

  if (error) {
    console.log("Cloud tag error: ", error);
  }

  useEffect(() => {
    if (!loading) {
      let createdTags = data.getAllTags.map((t) => {
        return { value: t.title, key: t.id, count: 0 };
      });

      if (reviews != undefined) {
        let t = getTagsTitle(reviews);

        dispatch({ type: ReducerType.TAGS, payload: [...new Set(t)] });

        createdTags = getCountTags(t, createdTags);

        //Todo delete if every tag has a review section
        createdTags = createdTags.filter((t) => t.count > 0);

        createdTags.push({
          value: allTags.value,
          key: allTags.key,
          count: allTags.count,
        });

        setTags(createdTags);
      }
    }
  }, [reviews]);

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

  const onClick = ({ value }) => {
    setSelectedTag(value);
    if (reviews != undefined && reviews?.length > 0) {
      let arr: Array<Review> = [];
      if (value === allTags.value) {
        arr = reviews;
      } else {
        // reviews.forEach((r) =>
        //   r.tags.forEach((t) => {
        //     if (t.title === value) {
        //       arr.push(r);
        //     }
        //   })
        // );
        arr = getReviewsByTags(reviews, value);
      }

      dispatch({ type: ReducerType.SHOW_REVIEW_TYPE, payload: arr });
    }
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

const getTagsTitle = (reviews: Array<Review>) => {
  return reviews
    .map((t) => {
      return t.tags.map((s) => s.title);
    })
    .flat(1);
};

const getCountTags = (t: Array<string>, createdTags: any) => {
  for (let i of t) {
    for (let y of createdTags) {
      if (y.value === i) {
        y.count += 1;
      }
    }
  }
  return createdTags;
};

export const getReviewsByTags = (reviews: Array<Review>, value: string) => {
  let arr: Array<Review> = [];
  reviews.forEach((r) =>
    r.tags.forEach((t) => {
      if (t.title === value) {
        arr.push(r);
      }
    })
  );
  return arr;
};
