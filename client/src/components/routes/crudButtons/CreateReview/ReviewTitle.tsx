import React, { FC, useEffect, useState } from "react";

interface ReviewTitleProps {
  title?: string;
  readOnly: boolean;
  sendOutTitle: (title: string) => void;
}

const ReviewTitle: FC<ReviewTitleProps> = ({
  title,
  readOnly,
  sendOutTitle,
}) => {
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    setCurrentTitle(title || "");
  }, [title]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
    sendOutTitle(e.target.value);
  };

  return (
    <div>
      <strong>Title</strong>
      <div className="title">
        <input
          type="text"
          value={currentTitle}
          onChange={onChangeTitle}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default ReviewTitle;
