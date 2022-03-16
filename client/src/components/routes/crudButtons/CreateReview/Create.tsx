import React, { FC, useState } from "react";
import MyNav from "../../../areas/nav/MyNav";
import Container from "react-bootstrap/Container";
import RichEditor from "../../../editor/RichEditor";
import { Node } from "slate";
import ReviewTitle from "./ReviewTitle";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store/AppState";
import ItemDropDown from "./ItemDropDown";
import Category from "../../../../models/Category";
import { useQuery } from "@apollo/client";
import { GetAllTags } from "../../../../gql/gql_functions";
import Tag from "../../../../models/Tag";
import Item from "../../../../models/CompoundModels/Item";
import FileUploader from "./FileUploader";

// interface ThreadBodyProps {
//   body?: string;
//   readOnly: boolean;
//   sendOutBody: (body: Node[]) => void;
// }

const marks = [1, 2, 3, 4, 5];

interface ReviewFormTypes {
  userId: string;
  title: string;
  body_node: Node[] | undefined;
  body: any;
  tags: Array<Tag>;
  category: Category;
  photos: File[];
  authorMark: number;
}

const CreateReview: FC = () => {
  const user = useSelector((state: AppState) => state.user);
  const [values, setValues] = useState<ReviewFormTypes>({
    userId: user?.id ?? "0",
    title: "",
    body_node: undefined,
    body: "",
    tags: [],
    category: new Category("0", "noname"),
    photos: [],
    authorMark: 0,
  });

  const categories = useSelector((state: AppState) => state.categories);
  const { error, data: allTags } = useQuery(GetAllTags, {
    fetchPolicy: "cache-first",
  });

  const [postMsg, setPostMsg] = useState("");

  console.log("Values: ", values);
  const receiveBody = (text: Node[]) => {
    // const m = getTextFromNodes(text);
    // setValues({ ...values, body: m });
    // setValues({ ...values, body_node: text, body: m });
    setValues({ ...values, body_node: text });
  };

  const updateUploadedFiles = (files) =>
    setValues({ ...values, photos: files });

  const onClick = () => {
    // setPostMsg("")
    if (values.title === "") setPostMsg("The title is empty.");
    else if (values.body_node?.length == 0 || values.body_node == undefined) {
      setPostMsg("The body is empty.");
    }
    console.log("Reviews created!!!");
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
          <RichEditor
            existingBody={values.body}
            // readOnly={readOnly}
            sendOutBody={receiveBody}
          />
        </div>

        {categories && (
          <>
            <div className="titles_create">Category</div>
            <ItemDropDown
              // sendOutSelectedItem={receiveCategory}
              sendOutSelectedItem={(c) =>
                setValues({
                  ...values,
                  category: new Category(c.value, c.label),
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
        <button onClick={onClick}>Create Reveiw</button>
      </Container>
    </>
  );
};

export default CreateReview;
