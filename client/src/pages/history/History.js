import React, { useEffect, useState, useRef } from "react";
import BannerProduct from "../UI/BannerProduct";
import useHttp from "../../hook/useHttp";
import { getFromStorage } from "../../hook/Storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./History.module.css";
const History = () => {
  const [history, setHistory] = useState({
    results: [],
    totalCount: null,
  });
  const [information, setInformation] = useState({});
  const { resResults } = useHttp();
  const user = getFromStorage("isLogged");

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const resResultsRef = useRef(resResults);
  const scrollRef = useRef(null);
  useEffect(() => {
    resResultsRef.current(
      "get",
      null,
      `/history?startIndex=${startIndex}&endIndex=${endIndex}`,
      setHistory,
      user.token
    );
  }, [startIndex, endIndex, user.token]);

  const viewHandle = async (id) => {
    await resResults(
      "get",
      null,
      `/information/${id}`,
      setInformation,
      user.token
    );
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [information]);
  return (
    <div>
      <BannerProduct title="history" />

      <table className={`${classes.table} `}>
        <thead>
          <tr className={`${classes.bg} text-center`}>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {history.results.map((history) => (
            <tr key={history._id}>
              <td className="text-secondary">{history._id}</td>
              <td className="text-secondary">{history.userId}</td>
              <td className="text-secondary">{history.name}</td>
              <td className="text-secondary">{history.phone}</td>
              <td className="text-secondary">{history.address}</td>
              <td className="text-secondary">{history.totalAmount} VND</td>
              <td className="text-secondary">{history.delivery}</td>
              <td className="text-secondary">{history.status}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => viewHandle(history._id)}
                >
                  view <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end me-3 mt-3">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary "
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className="mx-2 bg-black text-white p-2">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= history.totalCount}
          className="btn btn-secondary"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      {Object.keys(information).length > 0 && (
        <>
          <div className="ms-5" ref={scrollRef}>
            <h2>INFORMATION ORDER</h2>
            <p>ID User: {information.userId}</p>
            <p>Full Name: {information.name}</p>
            <p>Phone: {information.phone}</p>
            <p>Address: {information.address}</p>
            <p>Total: {information.totalAmount} VND</p>
          </div>
          <table className={`${classes.table} `}>
            <thead>
              <tr className={`${classes.bg} text-center`}>
                <th>ID PRODUCT</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {information.products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="fw-medium">{product._id}</td>
                  <td>
                    <img src={product.image} alt={product.name} />
                  </td>
                  <td className="fw-medium">{product.name}</td>
                  <td className="fw-medium">
                    {product.price.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="fw-medium">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default History;
