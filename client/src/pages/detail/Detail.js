import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useHttp from "../../hook/useHttp";

import { toast } from "react-toastify";

import { getFromStorage } from "../../hook/Storage";
import classes from "./Detail.module.css";
import Product from "../UI/Product";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [imgClick, setImgClick] = useState(null);
  const numberRef = useRef(null);
  const [reload, setReload] = useState(false);
  const [product, setProduct] = useState({});
  const [relativeProduct, setRelativeProduct] = useState({
    totalCount: null,
    results: [],
  });

  const { resResults } = useHttp();
  const user = getFromStorage("isLogged");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const resResultsRef = useRef(resResults);
  useEffect(() => {
    resResultsRef.current(
      "get",
      null,
      `/detailProduct/${params.productId}`,
      setProduct
    );
  }, [params.productId, reload]);

  useEffect(() => {
    if (product.category) {
      resResultsRef.current(
        "get",
        null,
        `/relativeProductDetail?_id=${params.productId}&category=${product.category}&startIndex=${startIndex}&endIndex=${endIndex}`,
        setRelativeProduct
      );
    }
  }, [product.category, startIndex, endIndex, params.productId]);

  const {
    img1,
    img2,
    img3,
    img4,
    name,
    price,
    short_desc,
    category,
    long_desc,
    count,
  } = product || {};

  const paragraphs = long_desc
    ?.split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  const imgNavigateHandler = (id) => {
    navigate("/detail/" + id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imagesUrl = [img1, img2, img3, img4];

  const addCartHandler = async (e) => {
    e.preventDefault();
    const numberProduct = +numberRef.current.value;
    if (Object.keys(user).length === 0) {
      navigate("/login");
      return;
    }
    if (count === 0) {
      toast("hết hàng");
      return;
    } else if (count < numberProduct) {
      toast("không đủ sản phẩm");
      return;
    }

    await resResults(
      "get",
      null,
      `/postCart?productId=${product._id}&quantity=${numberProduct}`,
      null,
      user.token
    );
    setReload(!reload);
    toast("thêm sản phẩm vào giỏ hàng thành côn");
  };

  return (
    <>
      <div className="row ">
        <div className="row col-6">
          <div className="col-2">
            {imagesUrl.map((img, index) => (
              <img
                src={img}
                key={index}
                alt={name}
                className="w-100 mb-3"
                onMouseEnter={() => setImgClick(img)}
              />
            ))}
          </div>
          <div className="col-10">
            <img src={imgClick || img4} alt={name} className="w-100" />
          </div>
        </div>
        <div className="col-6">
          <h1>{name}</h1>
          <p className="mt-4 fs-4 text-body-tertiary">
            {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
          </p>
          <p className="text-body-tertiary">{short_desc}</p>
          <p>
            <span className="text-uppercase fw-medium">Category:</span>
            {category}
          </p>
          <form onSubmit={addCartHandler}>
            <input
              type="number"
              name="number"
              placeholder="QUANTITY"
              className={classes.input}
              ref={numberRef}
              defaultValue={1}
              min={1}
              required
              disabled={count === 0}
            />
            <button className={classes.button} disabled={count === 0}>
              Add to cart
            </button>
          </form>
          <p className="mt-2">số lượng hàng: {count || 0}</p>
        </div>
      </div>
      <div className="my-5">
        <button className={classes.desc}>DESCRIPTION</button>
        <h4 className="text-uppercase mt-4">product description</h4>
        {paragraphs}
      </div>
      <div>
        <h4 className="text-uppercase">related products</h4>
        <Product
          products={relativeProduct.results}
          ondetailProductHandler={imgNavigateHandler}
          totalCount={relativeProduct.totalCount}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          endIndex={endIndex}
        />
      </div>
    </>
  );
};

export default Detail;
