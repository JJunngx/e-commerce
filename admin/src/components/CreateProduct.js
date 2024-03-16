import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import useHttp from "../hook/useHttp";
import InputProduct from "./InputProduct";
import { getFromStorage } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
const CreateProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const adminUser = getFromStorage("adminLogged");
  const decodedToken = jwtDecode(adminUser.token);

  useEffect(() => {
    if (success) {
      toast(success.message);
    }
  }, [success]);
  const { resResults } = useHttp();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
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
      "post",
      formData,
      "/admin/createProduct",
      setSuccess,
      adminUser.token
    );
    setIsSubmitting(false);
  };
  if (decodedToken.role === "Consultant") return;
  return (
    <>
      <InputProduct onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  );
};

export default CreateProduct;
