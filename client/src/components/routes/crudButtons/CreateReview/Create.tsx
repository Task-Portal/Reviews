import React, { FC, useState } from "react";
import MyNav from "../../../areas/nav/MyNav";
import Container from "react-bootstrap/Container";
import RichEditor from "../../../editor/RichEditor";
import { Node } from "slate";
import ReviewTitle from "./ReviewTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store/AppState";
import ItemDropDown from "./ItemDropDown";
import Category from "../../../../models/Category";
import { useMutation, useQuery } from "@apollo/client";
import {
  Create,
  GetAllTags,
  RegisterMutation,
} from "../../../../gql/gql_functions";
import Tag from "../../../../models/Tag";
import Item from "../../../../models/CompoundModels/Item";
import FileUploader from "./FileUploader";
import { ReducerType } from "../../../../store/ReducerType";
import Review from "../../../../models/Review";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

// interface ThreadBodyProps {
//   body?: string;
//   readOnly: boolean;
//   sendOutBody: (body: Node[]) => void;
// }

const marks = [1, 2, 3, 4, 5];

export interface ReviewFormTypes {
  id: string;
  userId: string;
  title: string;
  body_node: Node[] | undefined;
  body: any;
  tags: Array<Item>;
  categoryId: string;
  photos: File[];
  authorMark: number;
}

const CreateReview: FC = () => {
  const user = useSelector((state: AppState) => state.user);
  const history = useHistory();
  const [values, setValues] = useState<ReviewFormTypes>({
    id: "0",
    userId: user?.id ?? "0",
    title: "Title 1",
    body_node: undefined,
    body: "",
    tags: [],
    categoryId: "",
    photos: [],
    authorMark: 0,
  });

  const categories = useSelector((state: AppState) => state.categories);
  const { data: allTags } = useQuery(GetAllTags, {
    fetchPolicy: "cache-first",
  });
  const [execCreate] = useMutation(Create);

  const [postMsg, setPostMsg] = useState("");

  const receiveBody = (text: Node[]) => {
    setValues({ ...values, body_node: text });
  };

  const updateUploadedFiles = (files) =>
    setValues({ ...values, photos: files });

  const onClick = async () => {
    setPostMsg("");
    if (values.title === "") {
      setPostMsg("The title is empty.");
      return;
    } else if (
      values.body_node?.length === 0 ||
      values.body_node === undefined
    ) {
      setPostMsg("The body is empty.");
      return;
    }

    const variables = {
      userId: values.userId,
      id: values.id,
      title: values.title,
      body: JSON.stringify(values.body_node),
      tags: [...values.tags.map((t) => t.value)],
      categoryId: values.categoryId,
      authorMark: values.authorMark,
      // photos: values.photos,
    };
    try {
      const result = await execCreate({ variables });
      if (result && result.data && result.data.createReview.messages) {
        if (result.data.createReview.messages[0] === "200") {
          history.goBack();
        } else {
          setPostMsg(result.data.createReview.messages[0]);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <MyNav />
      <Container className="container_create_review">
        <div className="header">Create Review</div>
        <ReviewTitle
          title={values.title}
          readOnly={false}
          sendOutTitle={(t) => setValues({ ...values, title: t })}
        />
        <div className="titles_create">Body</div>
        <div className="body">
          <RichEditor existingBody={values.body} sendOutBody={receiveBody} />
        </div>

        {categories && (
          <>
            <div className="titles_create">Category</div>
            <ItemDropDown
              sendOutSelectedItem={(c) =>
                setValues({
                  ...values,
                  categoryId: c.value,
                })
              }
              items={categories.map((c) => new Item(c.id, c.name))}
              multiple={false}
            />
          </>
        )}
        {allTags && allTags.getAllTags && (
          <>
            <div className="titles_create">Tags</div>
            <ItemDropDown
              sendOutSelectedItem={(t: any) =>
                setValues({ ...values, tags: [...t] })
              }
              items={allTags.getAllTags.map((t) => new Item(t.id, t.name))}
              multiple={true}
            />
          </>
        )}

        <div className="titles_create">Photos</div>
        <FileUploader
          accept=".jpg,.png,.jpeg"
          label=""
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <div className="titles_create">Author Mark</div>
        <ItemDropDown
          sendOutSelectedItem={(m) =>
            setValues({ ...values, authorMark: Number(m.value) })
          }
          items={marks.map((t) => new Item(`${t}`, `${t}`))}
          multiple={false}
        />
        <Button variant="secondary" onClick={onClick} className="buttons">
          Create Review
        </Button>

        <strong style={{ color: "red" }}>{postMsg}</strong>
      </Container>
    </>
  );
};

export default CreateReview;
