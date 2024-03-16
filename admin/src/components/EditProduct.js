import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../hook/useHttp";
import InputProduct from "./InputProduct";
import { getFromStorage } from "../context/AuthContext";
const EditProduct = () => {
  const [product, setProduct] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { editProductId } = useParams();
  const { resResults } = useHttp();
  const adminUser = getFromStorage("adminLogged");
  const resResultsRef = useRef(resResults);
  useEffect(() => {
    resResultsRef.current(
      "get",
      null,
      `/admin/getEditProduct/${editProductId}`,
      setProduct,
      adminUser.token
    );
  }, [editProductId]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("_id", editProductId);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("short_desc", data.short_desc);
    formData.append("long_desc", data.long_desc);
    formData.append("price", data.price);
    formData.append("count", data.count);
    formData.append("images", data.images[0]);
    formData.append("images", data.images[1]);
    formData.append("images", data.images[2]);
    formData.append("images", data.images[3]);

    await resResults(
      "put",
      formData,
      "/admin/editProduct",
      null,
      adminUser.token
    );
    toast("cập nhật sản phẩm thành công");
    setIsSubmitting(false);
  };
  return (
    <>
      <InputProduct
        onSubmit={onSubmit}
        product={product}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default EditProduct;
