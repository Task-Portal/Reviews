import React, { FC } from "react";
import MyNav from "../../areas/nav/MyNav";
import CreateReview from "./CreateReview/CreateReview";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import Item from "../../../models/CompoundModels/Item";

// interface ThreadBodyProps {
//   body?: string;
//   readOnly: boolean;
//   sendOutBody: (body: Node[]) => void;
// }

const EditReview: FC = () => {
  let review = useSelector((state: AppState) => state.selectedReview);
  const categories = useSelector((state: AppState) => state.categories);

  const createElement = () => {
    if (review != null && categories) {
      let cat;
      categories.forEach((c) => {
        if (c?.name === review?.category.name) cat = c;
      });

      return (
        <CreateReview
          id={review.id}
          title={review.title}
          tags={review?.tags?.map((f) => new Item(f.id, f.name)) || []}
          photos={review.photos}
          body={review.body}
          category={cat}
          authorMark={review.authorMark}
          userId={review.user.id}
          // @ts-ignore
          body_node={review.body}
        />
      );
    }
    return null;
  };

  return (
    <>
      <MyNav />
      {createElement()}
    </>
  );
};

export default EditReview;
