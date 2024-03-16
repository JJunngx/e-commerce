import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const InputProduct = ({ onSubmit, product, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("category", product.category);
      setValue("short_desc", product.short_desc);
      setValue("long_desc", product.long_desc);
      setValue("price", product.price);
      setValue("count", product.count);
    }
  }, [product, setValue]);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (files.length !== 4) {
        // toast("phai du 4 hinh anh");
        toast.warning("phải đủ 4 hình ảnh", {
          position: "top-left",
          autoClose: 1000, // Đóng thông báo sau 1 giây
          hideProgressBar: false, // Hiển thị thanh tiến trình
          closeOnClick: true, // Đóng thông báo khi click vào
          pauseOnHover: true, // Tạm dừng đóng thông báo khi hover
          draggable: true, // Có thể kéo thông báo
        });
        return;
      } else {
        const imageUrls = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
      }
    }
  };

  return (
    <form className="w-75 mt-5" onSubmit={handleSubmit(onSubmit)}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Enter Product Name"
        className={`form-control ${errors.name ? "border border-danger" : ""}`}
        {...register("name", { required: true })}
      />
      {errors.name && errors.name.type === "required" && (
        <p className="text-danger">required</p>
      )}
      <label className="mt-3">Category</label>
      <input
        type="text"
        placeholder="Enter Category"
        className={`form-control ${
          errors.category ? "border border-danger" : ""
        }`}
        {...register("category", { required: true })}
      />
      {errors.category && errors.category.type === "required" && (
        <p className="text-danger">required</p>
      )}
      <label className="mt-3">{errors.category?.message}</label>
      <textarea
        className={`form-control ${
          errors.short_desc ? "border border-danger" : ""
        }`}
        rows="3"
        placeholder="Enter Short Description"
        {...register("short_desc", { required: true })}
      ></textarea>
      {errors.short_desc && errors.short_desc.type === "required" && (
        <p className="text-danger">required</p>
      )}

      <label className="mt-3">Long Description</label>
      <textarea
        className={`form-control ${
          errors.long_desc ? "border border-danger" : ""
        }`}
        rows="5"
        placeholder="Enter Long Description"
        {...register("long_desc", { required: true })}
      ></textarea>
      {errors.long_desc && errors.long_desc.type === "required" && (
        <p className="text-danger">required</p>
      )}

      <label className="mt-3">Price</label>
      <input
        type="number"
        className={`form-control ${errors.price ? "border border-danger" : ""}`}
        min={1}
        {...register("price", { required: true })}
      />
      {errors.price && errors.price.type === "required" && (
        <p className="text-danger">required</p>
      )}

      <label className="mt-3">số lượng sản phẩm</label>
      <input
        type="number"
        className={`form-control ${errors.count ? "border border-danger" : ""}`}
        min={1}
        {...register("count", { required: true })}
      />
      {errors.count && errors.count.type === "required" && (
        <p className="text-danger">required</p>
      )}

      <label className="mt-3 ">Upload image(5 images)</label>

      <input
        type="file"
        {...register("images", { required: true, length: 4 })}
        className={`form-control d-block ${
          errors.images ? "border border-danger" : ""
        }`}
        onChange={handleImageChange}
        multiple
      />
      {selectedImages &&
        selectedImages.map((imageUrl, index) => (
          <img key={index} className="w-25" src={imageUrl} alt="" />
        ))}

      {errors.images && errors.images.type === "required" && (
        <p className="text-danger">required</p>
      )}

      {product && (
        <div className="mt-4">
          <p>Anh của sản phẩm có sẵn</p>
          <img className="w-25" src={product.img1} alt={product.name} />
          <img className="w-25" src={product.img2} alt={product.name} />
          <img className="w-25" src={product.img3} alt={product.name} />
          <img className="w-25" src={product.img4} alt={product.name} />
        </div>
      )}

      <button className="btn btn-primary mt-3 d-block" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default InputProduct;
