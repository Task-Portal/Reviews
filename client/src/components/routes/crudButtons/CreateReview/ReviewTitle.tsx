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
  return (
    <div>
      <strong>Title</strong>
      <div className="title">
        <input
          type="text"
          value={title || ""}
          onChange={(e) => sendOutTitle(e.target.value)}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default ReviewTitle;
