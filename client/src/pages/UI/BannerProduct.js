import React from "react";
import classes from "./BannerProduct.module.css";
const BannerProduct = (props) => {
  return (
    <div
      className={`${classes.banner} d-flex align-items-center justify-content-between mb-5`}
    >
      <p className="fs-3 ms-5 text-uppercase">{props.title}</p>
      <p>
        <span className="text-uppercase fw-medium"> {props.folder}</span>
        <span className="text-body-tertiary me-5 text-uppercase">
          {props.title}
        </span>
      </p>
    </div>
  );
};

export default BannerProduct;
