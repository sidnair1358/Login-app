import React from "react";

const Image = ({ path, altText }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "auto",
        height: "auto",
      }}
    >
      <img src={path} alt={altText} />
    </div>
  );
};

export default Image;
