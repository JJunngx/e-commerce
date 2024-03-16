import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../store/PopupProduct";
import { useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { IoMdClose } from "react-icons/io";

import useHttp from "../../hook/useHttp";
import classes from "./ListProduct.module.css";
import Product from "../UI/Product";

const ListProduct = () => {
  const popup = useSelector((state) => state.popup.popup);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();
  const [products, setProducts] = useState({
    totalCount: null,
    results: [],
  });

  const navigate = useNavigate();
  const { resResults } = useHttp();

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const resResultsRef = useRef(resResults);
  useEffect(() => {
    resResultsRef.current(
      "get",
      null,
      `/products?startIndex=${startIndex}&endIndex=${endIndex}`,
      setProducts
    );
  }, [startIndex, endIndex]);

  const onPopupHandler = (id) => {
    dispatch(popupActions.onPopup());
    const detail = products.results.find((producId) => producId._id === id);
    setDetail(detail);
  };
  const offPopupHandler = () => {
    dispatch(popupActions.offPopup());
  };
  const viewDetailHandler = (id) => {
    navigate("/detail/" + id);
    offPopupHandler();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="my-5">
      <div className="fst-italic text-uppercase  text-body-tertiary">
        made the hard way
      </div>
      <h2 className="text-uppercase fst-italic mb-4">top trending products</h2>

      <Product
        products={products.results}
        ondetailProductHandler={onPopupHandler}
        totalCount={products.totalCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        endIndex={endIndex}
      />

      {popup && (
        <div className="position-relative">
          <div className={classes.backdrop} onClick={offPopupHandler}></div>

          <div className={`${classes.modal} row align-items-center`}>
            <div className="col">
              <img src={detail?.img1} alt={detail?.name} className="w-100" />
            </div>
            <div className="col ">
              <button className={classes.locationX} onClick={offPopupHandler}>
                <IoMdClose />
              </button>
              <h2>{detail?.name}</h2>
              <p className="fs-4">
                {detail?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                VND
              </p>
              <p className="text-body-tertiary">{detail?.short_desc}</p>

              <Button
                variant="dark"
                className="rounded-0 px-4 fs-5"
                onClick={() => viewDetailHandler(detail._id)}
              >
                <IoCartSharp /> View Detail
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
