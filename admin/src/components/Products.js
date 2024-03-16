import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useHttp from "../hook/useHttp";
import { getFromStorage } from "../context/AuthContext";
import "./Dashboard.css";
const Products = () => {
  const search = useRef(null);
  const { resResults } = useHttp();
  const [products, setProduct] = useState({
    totalCount: null,
    results: [],
  });

  const [reload, setReload] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const adminUser = getFromStorage("adminLogged");
  const resResultsRef = useRef(resResults);
  useEffect(() => {
    resResultsRef.current(
      "get",
      null,
      `/admin/products?startIndex=${startIndex}&endIndex=${endIndex}`,
      setProduct,
      adminUser.token
    );
  }, [reload, currentPage, startIndex, endIndex]);

  const searchChange = async () => {
    const searchEntered = search.current.value;
    await resResults(
      "get",
      null,
      `/search?keyword=${searchEntered}&startIndex=${startIndex}&endIndex=${endIndex}`,
      setProduct
    );
  };

  const deleteProductHandle = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      setSending(true);
      await resResults("delete", null, `/admin/deleteProduct/${id}`);
      setReload(!reload);
      setSending(false);
    }
  };

  return (
    <div>
      <h3>Products</h3>
      <input
        type="search"
        className="w-25 form-control"
        placeholder="Enter Search!"
        ref={search}
        onChange={searchChange}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.results.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString("vi-VN")} VND</td>
              <td>
                <img src={product.img1} alt={product.name} className="img" />
              </td>
              <td>{product.category}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => navigate(`editProduct/${product._id}`)}
                >
                  update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProductHandle(product._id)}
                  disabled={sending}
                >
                  delete
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
          className="btn btn-secondary me-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className="mx-2 bg-black text-white p-2">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= products.totalCount}
          className="btn btn-secondary"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Products;
