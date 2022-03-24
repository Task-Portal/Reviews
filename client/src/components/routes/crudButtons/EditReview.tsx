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
    if (review != null && review[0] != null && categories) {
      let r = review[0];
      let cat;
      categories.forEach((c) => {
        if (c?.name === r.category.name) cat = c;
      });

      return (
        <CreateReview
          id={r.id}
          title={r.title}
          tags={r?.tags?.map((f) => new Item(f.id, f.name)) || []}
          photos={r.photos}
          body={r.body}
          category={cat}
          authorMark={r.authorMark}
          userId={r.user.id}
          // @ts-ignore
          body_node={r.body}
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
