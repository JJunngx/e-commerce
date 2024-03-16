import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faFileCirclePlus,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import useHttp from "../hook/useHttp";
import "./Dashboard.css";
import { getFromStorage } from "../context/AuthContext";
const Dashboard = () => {
  const [orders, setOrder] = useState({
    totalCount: null,
    results: [],
  });
  const [information, setInformation] = useState({});
  const { resResults } = useHttp();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const scrollRef = useRef(null);
  const orderRef = useRef(resResults);
  const user = getFromStorage("adminLogged");
  useEffect(() => {
    orderRef.current(
      "get",
      null,
      `/admin/orders?startIndex=${startIndex}&endIndex=${endIndex}`,
      setOrder,
      user.token
    );
  }, [startIndex, endIndex]);

  const totalRevenue = orders.results.reduce(
    (total, current) =>
      total + parseInt(current.totalAmount.replace(/\D/g, ""), 10),
    0
  );

  const averageMonthlyRevenue = (totalRevenue / 12).toLocaleString("vi-VN");

  const viewHandle = async (id) => {
    await resResults(
      "get",
      null,
      `/admin/information/${id}`,
      setInformation,
      user.token
    );
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [information]);
  return (
    <>
      <p className="text-secondary">Dashboard</p>
      <div className="row px-3" style={{ height: "100px" }}>
        <div className="d-flex justify-content-between shadow-sm bg-white col-4 align-items-center">
          <div className="d-flex flex-column">
            <span>{orders.totalCount}</span>{" "}
            <span className="text-secondary">Clients</span>
          </div>
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
        <div className="d-flex justify-content-between shadow-sm bg-white col-4 align-items-center">
          <div className="d-flex flex-column">
            <span>{averageMonthlyRevenue}</span>
            <span className="text-secondary">Earnings of Month</span>
          </div>
          <span className="fs-4 text-secondary">$</span>
        </div>
        <div className="d-flex justify-content-between shadow-sm bg-white col-4 align-items-center">
          <div className="d-flex flex-column">
            <span>2</span> <span className="text-secondary">New Order</span>
          </div>
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </div>
      </div>
      <div className="bg-white vh-50 mt-5 p-3">
        <h3>History</h3>
        <table>
          <thead>
            <tr>
              <th>ID User</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>total</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.results.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.totalAmount}</td>
                <td>{order.delivery}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => viewHandle(order._id)}
                  >
                    view
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
            disabled={endIndex >= orders.totalCount}
            className="btn btn-secondary"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      {Object.keys(information).length > 0 && (
        <div className="ms-5 my-5">
          <div ref={scrollRef}>
            <h2>INFORMATION ORDER</h2>
            <p>ID User: {information.userId}</p>
            <p>Full Name: {information.name}</p>
            <p>Phone: {information.phone}</p>
            <p>Address: {information.address}</p>
            <p>Total: {information.totalAmount} VND</p>
          </div>
          <table>
            <thead>
              <tr className="text-center">
                <th>ID PRODUCT</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {information.products.map((product) => (
                <tr key={product._id}>
                  <td className="fw-medium">{product._id}</td>
                  <td>
                    <img
                      src={product.image}
                      className="img"
                      alt={product.name}
                    />
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
        </div>
      )}
    </>
  );
};

export default Dashboard;
