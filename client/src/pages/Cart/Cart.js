import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretLeft,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FaGift } from "react-icons/fa6";
import { orderActions } from "../../store/order";
import useHttp from "../../hook/useHttp";
import BannerProduct from "../UI/BannerProduct";
import { getFromStorage } from "../../hook/Storage";
import classes from "./Cart.module.css";

const Cart = () => {
  const [listProduct, setListProduct] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resResults } = useHttp();
  const user = getFromStorage("isLogged");

  const resResultsRef = useRef(resResults);
  useEffect(() => {
    resResultsRef.current("get", null, "/getCart", setListProduct, user.token);
  }, [reload, user.token]);

  const adjustProductQuantity = async (id, number, quantity) => {
    const product = listProduct.find((product) => product.quantity === 1);

    if (product && number === -1 && quantity === 1) {
      if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

      await resResults(
        "delete",
        null,
        `/deleteItemCart/${product._id._id}?quantity=${quantity}`,
        null,
        user.token
      );
    } else if (quantity > 0) {
      await resResults(
        "get",
        null,
        `/postCart?quantity=${number}&productId=${id}`,
        null,
        user.token
      );
    } else {
      toast.info("hết hàng", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setReload(!reload);
  };

  const deleteItemCart = async (id, quantity) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    await resResults(
      "delete",
      null,
      `/deleteItemCart/${id}?quantity=${quantity}`,
      null,
      user.token
    );
    setReload(!reload);
  };
  const totalProduct = listProduct
    .reduce(
      (accumulator, currentProduct) =>
        accumulator + currentProduct._id.price * currentProduct.quantity,
      0
    )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const orderTotal = {
    totalPrice: totalProduct,
    totalProduct: listProduct,
  };

  const navigateProceedHandler = () => {
    dispatch(orderActions.yourOrder(orderTotal));
    navigate("/checkout");
  };

  return (
    <>
      <BannerProduct title="cart" />
      <h3 className="text-uppercase mb-4">shopping cart</h3>
      <div className="row mb-5">
        <div className="col-8">
          <table className={`${classes.table} `}>
            <thead>
              <tr className={`${classes.bg} text-center`}>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {listProduct.map((product) => (
                <tr key={product._id._id}>
                  <td>
                    <img
                      src={product._id.img1}
                      alt={product._id.name}
                      className={classes.cursor}
                      onClick={() => navigate(`/detail/${product._id._id}`)}
                    />
                  </td>
                  <td
                    className={`fs-5 fw-medium text-center ${classes.cursor}`}
                    onClick={() => navigate(`/detail/${product._id._id}`)}
                  >
                    {product._id.name}
                  </td>
                  <td className="text-body-tertiary">
                    {product._id.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    VND
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faCaretLeft}
                      onClick={() =>
                        adjustProductQuantity(
                          product._id._id,
                          -1,
                          product.quantity
                        )
                      }
                      className={classes.cursor}
                    />

                    <span className="px-3">{product.quantity}</span>

                    <FontAwesomeIcon
                      icon={faCaretRight}
                      onClick={() =>
                        adjustProductQuantity(
                          product._id._id,
                          +1,
                          product._id.count
                        )
                      }
                      className={classes.cursor}
                    />
                  </td>

                  <td className="text-body-tertiary">
                    {(product._id.price * product.quantity)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    VND
                  </td>
                  <td className="text-center">
                    <FaRegTrashAlt
                      className={classes.cursor}
                      onClick={() =>
                        deleteItemCart(product._id._id, product.quantity)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={`d-flex justify-content-between align-items-center ${classes.end} `}
          >
            <Link to="/shop" className="text-decoration-none text-black">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="fst-italic ms-2">Continue shopping</span>
            </Link>
            <button
              className={classes.btnProceed}
              onClick={navigateProceedHandler}
            >
              <span className="me-2 fst-italic"> Proceed to checkout </span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className={`${classes.bg} col-4  p-5 h-100 `}>
          <h3>CART TOTAL</h3>

          <p className="d-flex justify-content-between mt-4 border-bottom pb-2">
            <span className="fw-medium fs-5">SUBTOTAL</span>
            <span className="text-body-tertiary ">{totalProduct}VND</span>
          </p>
          <p className="d-flex justify-content-between mb-5">
            <span className="fw-medium fs-5">TOTAL</span>
            <span className="fs-5">{totalProduct}VND</span>
          </p>
          <input
            type="text"
            placeholder="Enter your coupon"
            className={classes.inputCoupon}
          />

          <button
            className={`${classes.buttonGift} d-flex justify-content-center align-items-center`}
          >
            <FaGift />
            Apply coupon
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
