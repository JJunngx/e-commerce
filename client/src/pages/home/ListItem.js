import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deviceActions } from "../../store/SmartDevice";

import classes from "./ListItem.module.css";
const ListItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgHandler = (category) => {
    // const listProduct = products.filter(
    //   (product) => product.category === category
    // );
    dispatch(deviceActions.setDataProduct(category));
    navigate("/shop");
  };

  const renderImg = (img, alt, category) => (
    <img
      src={img}
      alt={alt}
      className={`mb-4 ms-4 ${classes.imgbright}`}
      onClick={() => imgHandler(category)}
    />
  );

  return (
    <div className="text-center mt-5">
      <div className="fst-italic text-uppercase  text-body-tertiary">
        carefully created collections
      </div>
      <h2 className="text-uppercase fst-italic mb-4">browse our catecories</h2>

      {renderImg(
        "https://asm3-njs-tongthe.onrender.com/images/product_1.png",
        "product_1",
        "iphone"
      )}
      {renderImg(
        "https://asm3-njs-tongthe.onrender.com/images/product_2.png",
        "product_2"
      )}
      {renderImg(
        "https://asm3-njs-tongthe.onrender.com/images/product_3.png",
        "product_3",
        "ipad"
      )}
      {renderImg(
        "https://asm3-njs-tongthe.onrender.com/images/product_4.png",
        "product_4",
        "watch"
      )}
      {renderImg(
        "https://asm3-njs-tongthe.onrender.com/images/product_5.png",
        "product_5",
        "airpod"
      )}
    </div>
  );
};

export default ListItem;
