import React, { Fragment, useEffect, useState } from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../layout/DashboardSidebar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
import "./stylesheets/NewProduct.css";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../redux-toolkit/slices/admin.slice";
import { fetchProductDetails } from "../../redux-toolkit/slices/product.slice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productSlice);

  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      description,
      price,
      category,
      stock,
      images,
    };

    dispatch(updateProduct({ id, myForm }));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, []);

  useEffect(() => {
    setName(product?.name);
    setPrice(product?.price);
    setDescription(product?.description);
    setStock(product?.stock);
    setCategory(product?.category);
    setOldImages(product?.images);

    if (error) {
      toast.error(error);
    }
  }, [dispatch, id, error, product]);

  return (
    <>
      <PageTitle title={"Ecommerce- Admin Update Product"} />
      <Header />
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <SideBar />

          {product && (
            <div
              style={{
                width: "calc(100vw - 200px)",
                minHeight: "fit-content",
                maxHeight: "fit-content",
                padding: "10px",
              }}
              className="form"
            >
              <form
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                <h1>Update Product</h1>

                <div className="input-group">
                  <span className="icon-wrapper">
                    <SpellcheckIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <span className="icon-wrapper">
                    <AttachMoneyIcon />
                  </span>
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="input-group">
                  <span className="icon-wrapper">
                    <DescriptionIcon />
                  </span>

                  <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  ></textarea>
                </div>

                <div className="input-group">
                  <span className="icon-wrapper">
                    <AccountTreeIcon />
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <span className="icon-wrapper">
                    <StorageIcon />
                  </span>
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                <div className="input-group">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  />
                </div>

                <div
                  style={{ display: "flex", gap: "10px" }}
                  id="createProductFormImage"
                >
                  <p>Old Images</p>

                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        width={30}
                        height={25}
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                      />
                    ))}
                </div>

                <Button type="submit">Update</Button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default UpdateProduct;
