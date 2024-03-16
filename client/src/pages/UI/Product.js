import classes from "./Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
  return (
    <>
      <ul className="list-unstyled row">
        {props.products.map((product) => (
          <li key={product._id} className="col-3">
            <img
              src={product.img1}
              alt={product.name}
              className={`w-100  ${classes.img}`}
              onClick={() => props.ondetailProductHandler(product._id)}
            />
            <h5 className="fst-italic text-center mt-4">{product.name}</h5>
            <p className="text-center text-body-tertiary text-uppercase fs-6">
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              vnd
            </p>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-end me-3 mt-3">
        <button
          onClick={() => props.setCurrentPage(props.currentPage - 1)}
          className="btn btn-outline-dark"
          disabled={props.currentPage === 1}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>

        <span className="mx-2 bg-black text-white p-2 px-3">
          {props.currentPage}
        </span>
        <button
          onClick={() => props.setCurrentPage(props.currentPage + 1)}
          disabled={props.endIndex >= props.totalCount}
          className="btn btn-outline-dark"
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <p className="text-end me-3">Showing {props.totalCount} result</p>
    </>
  );
};

export default Product;
