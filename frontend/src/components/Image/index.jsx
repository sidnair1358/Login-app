import React from "react";
import styles from "./styles.module.css";

const Image = ({ path, altText }) => {
  return (
    <div className={styles.container}>
      <img src={path} alt={altText} />
    </div>
  );
};

export default Image;
