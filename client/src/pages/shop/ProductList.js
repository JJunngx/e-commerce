// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import useHttp from "../../hook/useHttp";
// import Product from "../UI/Product";
// import BannerProduct from "../UI/BannerProduct";

// import classes from "./ProductList.module.css";

// const ProductList = () => {
//   const [products, setProducts] = useState({
//     totalCount: null,
//     results: [],
//   });

//   const category = useSelector((state) => state.device.device);

//   const [activeCategory, setActiveCategory] = useState("");

//   const navigate = useNavigate();

//   const searchRef = useRef();

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const { resResults } = useHttp();
//   const resResultsRef = useRef(resResults);

//   const initialCategory = useRef(category);

//   useEffect(() => {
//     if (initialCategory.current) {
//       setActiveCategory(initialCategory.current);
//     } else {
//       setActiveCategory("all");
//     }
//   }, []);

//   useEffect(() => {
//     if (activeCategory === "all") {
//       resResultsRef.current(
//         "get",
//         null,
//         `/products?startIndex=${startIndex}&endIndex=${endIndex}`,
//         setProducts
//       );
//     } else if (activeCategory !== "") {
//       resResultsRef.current(
//         "get",
//         null,
//         `/relativeProduct?category=${activeCategory}&startIndex=${startIndex}&endIndex=${endIndex}`,
//         setProducts
//       );
//     }
//   }, [startIndex, endIndex, activeCategory]);

//   const submitHandler = async (name) => {
//     setActiveCategory(name);
//     setCurrentPage(1);
//   };

//   const AllDeviceHandler = async (name) => {
//     setActiveCategory(name);
//     setCurrentPage(1);
//   };
//   const detailProductHandler = (id) => {
//     navigate("/detail/" + id);
//   };
//   const searchChangeHandler = async () => {
//     const keyword = searchRef.current.value;
//     setCurrentPage(1);

//     await resResults(
//       "get",
//       null,
//       `/search?keyword=${keyword}&startIndex=${startIndex}&endIndex=${endIndex}`,
//       setProducts
//     );

//     setActiveCategory("all");
//   };

//   return (
//     <>
//       <BannerProduct title="shop" />
//       <div className="row ">
//         <div className="col-3">
//           <h3 className="text-uppercase ">categories</h3>
//           <ul className={`list-unstyled ${classes.list}`}>
//             <li className="text-white bg-black p-2 ps-4 fw-medium">APPLE</li>
//             <li
//               className={`p-2 ps-4 ${
//                 activeCategory === "all" ? "text-warning" : ""
//               }`}
//               onClick={() => AllDeviceHandler("all")}
//             >
//               All
//             </li>
//             <li className="bg-secondary-subtle p-2 ps-4 text-black text-uppercase fw-medium">
//               Iphone & Mac
//             </li>
//             <li
//               className={`p-2 ps-4 ${
//                 activeCategory === "iphone" ? "text-warning" : ""
//               }`}
//               onClick={() => submitHandler("iphone")}
//             >
//               Iphone
//             </li>
//             <li
//               className={`p-2 ps-4 ${
//                 activeCategory === "ipad" ? "text-warning" : ""
//               }`}
//               onClick={() => submitHandler("ipad")}
//             >
//               Ipad
//             </li>
//             <li className="bg-secondary-subtle p-2 ps-4 text-black text-uppercase fw-medium">
//               wireless
//             </li>
//             <li
//               className={`p-2 ps-4 ${
//                 activeCategory === "airpod" ? "text-warning" : ""
//               }`}
//               onClick={() => submitHandler("airpod")}
//             >
//               Airpod
//             </li>
//             <li
//               className={`p-2 ps-4 ${
//                 activeCategory === "watch" ? "text-warning" : ""
//               }`}
//               onClick={() => submitHandler("watch")}
//             >
//               Watch
//             </li>
//             <li className="bg-secondary-subtle p-2 ps-4 text-black text-uppercase fw-medium">
//               Other
//             </li>
//             <li className="p-2 ps-4">Mouse</li>
//             <li className="p-2 ps-4">Keyboard</li>
//             <li className="p-2 ps-4">Other</li>
//           </ul>
//         </div>

//         <div className="col-9">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <input
//               type="search"
//               name="search"
//               placeholder="Enter Search Here"
//               className={classes.input}
//               ref={searchRef}
//               onChange={searchChangeHandler}
//             />
//             <select name="smartdevice" id="device" className="form-select w-25">
//               <option value="default">Default sorting</option>
//             </select>
//           </div>

//           <div>
//             <Product
//               products={products.results}
//               ondetailProductHandler={detailProductHandler}
//               totalCount={products.totalCount}
//               setCurrentPage={setCurrentPage}
//               currentPage={currentPage}
//               endIndex={endIndex}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useHttp from "../../hook/useHttp";
import Product from "../UI/Product";
import BannerProduct from "../UI/BannerProduct";

import classes from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState({
    totalCount: null,
    results: [],
  });

  const category = useSelector((state) => state.device.device);

  const [activeCategory, setActiveCategory] = useState("");

  const navigate = useNavigate();

  const searchRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const { resResults } = useHttp();
  const resResultsRef = useRef(resResults);

  const initialCategory = useRef(category);

  useEffect(() => {
    if (initialCategory.current) {
      setActiveCategory(initialCategory.current);
    } else {
      setActiveCategory("all");
    }
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      resResultsRef.current(
        "get",
        null,
        `/products?startIndex=${startIndex}&endIndex=${endIndex}`,
        setProducts
      );
    } else if (activeCategory !== "") {
      resResultsRef.current(
        "get",
        null,
        `/relativeProduct?category=${activeCategory}&startIndex=${startIndex}&endIndex=${endIndex}`,
        setProducts
      );
    }
  }, [startIndex, endIndex, activeCategory]);

  const submitHandler = async (name) => {
    setActiveCategory(name);
    setCurrentPage(1);
  };

  const AllDeviceHandler = async (name) => {
    setActiveCategory(name);
    setCurrentPage(1);
  };
  const detailProductHandler = (id) => {
    navigate("/detail/" + id);
  };
  const searchChangeHandler = async () => {
    const keyword = searchRef.current.value;
    setCurrentPage(1);

    await resResults(
      "get",
      null,
      `/search?keyword=${keyword}&startIndex=${startIndex}&endIndex=${endIndex}`,
      setProducts
    );

    setActiveCategory("all");
  };

  return (
    <>
      <BannerProduct title="shop" />
      <div className="row ">
        <div className="col-3">
          <h3 className="text-uppercase ">categories</h3>
          <ul className={`list-unstyled ${classes.list}`}>
            <li className="text-white bg-black p-2 ps-4 fw-medium">APPLE</li>
            <li
              className={`p-2 ps-4 ${
                activeCategory === "all" ? "text-warning" : ""
              }`}
              onClick={() => AllDeviceHandler("all")}
            >
              All
            </li>
            <li className="bg-secondary-subtle p-2 ps-4 text-black text-uppercase fw-medium">
              Iphone & Mac
            </li>
            <li
              className={`p-2 ps-4 ${
                activeCategory === "iphone" ? "text-warning" : ""
              }`}
              onClick={() => submitHandler("iphone")}
            >
              Iphone
            </li>
            <li
              className={`p-2 ps-4 ${
                activeCategory === "ipad" ? "text-warning" : ""
              }`}
              onClick={() => submitHandler("ipad")}
            >
              Ipad
            </li>
            <li className="bg-secondary-subtle p-2 ps-4 text-black text-uppercase fw-medium">
              wireless
            </li>
            <li
              className={`p-2 ps-4 ${
                activeCategory === "airpod" ? "text-warning" : ""
              }`}
              onClick={() => submitHandler("airpod")}
            >
              Airpod
            </li>
            <li
              className={`p-2 ps-4 ${
                activeCategory === "watch" ? "text-warning" : ""
              }`}
              onClick={() => submitHandler("watch")}
            >
              Watch
            </li>
            <li className="bg-secondary-subtle p-2 ps-4 text-black text-uppercase fw-medium">
              Other
            </li>
            <li className="p-2 ps-4">Mouse</li>
            <li className="p-2 ps-4">Keyboard</li>
            <li className="p-2 ps-4">Other</li>
          </ul>
        </div>

        <div className="col-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <input
              type="search"
              name="search"
              placeholder="Enter Search Here"
              className={classes.input}
              ref={searchRef}
              onChange={searchChangeHandler}
            />
            <select name="smartdevice" id="device" className="form-select w-25">
              <option value="default">Default sorting</option>
            </select>
          </div>

          <div>
            <Product
              products={products.results}
              ondetailProductHandler={detailProductHandler}
              totalCount={products.totalCount}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              endIndex={endIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
