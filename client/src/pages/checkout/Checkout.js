import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getFromStorage } from "../../hook/Storage";
import useHttp from "../../hook/useHttp";
import { toast } from "react-toastify";

import classes from "./Checkout.module.css";
import BannerProduct from "../UI/BannerProduct";
import { jwtDecode } from "jwt-decode";
const Checkout = () => {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resResults } = useHttp();
  const totalProduct = useSelector((state) => state.order.totalProduct);

  const totalPrice = useSelector((state) => state.order.totalPrice);
  const user = getFromStorage("isLogged");

  const decodedToken = jwtDecode(user.token);
  console.log(decodedToken);
  const onSubmit = async (data) => {
    setSending(true);
    data.products = totalProduct.map((product) => ({
      _id: product._id._id,
      name: product._id.name,
      image: product._id.img1,
      price: product._id.price,
      quantity: product.quantity,
    }));

    data.totalAmount = totalPrice;
    data.userId = decodedToken.userId;

    await resResults("post", data, "/order", null);

    // toast("Wow so easy!");
    toast.success("Đơn hàng đã được gửi tới email", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Đóng thông báo sau 2 giây
      hideProgressBar: false, // Hiển thị thanh tiến trình
      closeOnClick: true, // Đóng thông báo khi click vào
      pauseOnHover: true, // Tạm dừng đóng thông báo khi hover
      draggable: true, // Có thể kéo thông báo
    });
    setSending(false);
  };

  return (
    <>
      <BannerProduct title="checkout" folder="home / cart / " />
      <p className="text-uppercase fs-3">billing details</p>
      <div className="row">
        <form
          className={`col-8 d-flex flex-column ${classes.form}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>full name:</label>
          <input
            type="text"
            placeholder="Enter Your Full Name Here!"
            {...register("name", { required: true })}
          />
          {errors.name && errors.name.type === "required" && (
            <p className="text-danger">require</p>
          )}
          <label>email:</label>
          <input
            type="email"
            placeholder="Enter Your Email Here!"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
                message: "Email must be a valid Gmail address",
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-danger">require</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <label>phone number:</label>
          <input
            type="tel"
            placeholder="Enter Your Phone Number Here!"
            {...register("phone", {
              required: true,
              pattern: {
                value: /^[0-9\b]+$/,
                message: "số điện thoại không hợp lệ",
              },
            })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <p className="text-danger">please enter phone</p>
          )}
          {errors.phone && errors.phone.type === "pattern" && (
            <p className="text-danger">{errors.phone.message}</p>
          )}

          <label>address:</label>
          <input
            type="text"
            placeholder="Enter Your Address Here!"
            {...register("address", { required: true })}
          />
          {errors.address && errors.address.type === "required" && (
            <p className="text-danger">require</p>
          )}
          <button className={classes.btnOrder} disabled={sending}>
            Place order
          </button>
        </form>
        <div className={`${classes.bg} col-4 p-4 h-100`}>
          <p className="text-uppercase fs-4">your order</p>
          <ul className="list-unstyled">
            {totalProduct.map((product) => (
              <li key={product._id._id} className="border-bottom py-3">
                <span className="fs-6 fw-medium me-1">{product._id.name}</span>

                <span className="text-body-tertiary">
                  {product._id.price.toLocaleString("vi-VN")} VND x
                  {product.quantity}
                </span>
              </li>
            ))}
          </ul>
          <p className="fs-5 d-flex justify-content-between">
            <span className="text-uppercase">total</span>
            <span>{totalPrice} VND</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Checkout;
