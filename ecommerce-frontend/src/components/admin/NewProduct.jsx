import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import "./stylesheets/NewProduct.css";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../layout/DashboardSidebar";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
import PersonIcon from "@mui/icons-material/Person";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  clearAdminState,
} from "../../redux-toolkit/slices/admin.slice";

const NewProdcut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, createProductSuccess } = useSelector(
    (state) => state.adminSlice
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "laptop",
    "snikkers",
    "smart phones",
    "footwear",
    "kids items",
    "books",
    "clothes",
    "personal computers",
  ];

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProduct({ name, price, description, category, stock, images })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (createProductSuccess) {
      dispatch(clearAdminState());
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    }
  }, [dispatch, error, createProductSuccess]);

  return (
    <>
      <PageTitle title={"Ecommerce-Admin Craete PRoduct"} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <DashboardTop />
          <main>
            <div style={{ display: "flex" }}>
              <SideBar />

              <div
                style={{
                  width: "calc(100vw - 200px)",
                  padding: "10px",
                  maxHeight: "fit-content",
                }}
                className="form"
              >
                <form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <h1>Create Product</h1>

                  <div className="input-group">
                    <span className="icon-wrapper">
                      <SpellcheckIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Product Name"
                      required
                      value={name}
                      name="name"
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
                      name="price"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <span className="icon-wrapper">
                      <DescriptionIcon />
                    </span>

                    <textarea
                      placeholder="Product Description"
                      value={description}
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div>

                  <div className="input-group">
                    <span className="icon-wrapper">
                      <AccountTreeIcon />
                    </span>
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate} name="category">
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
                      name="stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <span className="icon-wrapper">
                      <PersonIcon />
                    </span>
                    <input
                      style={{ padding: "2px 5px" }}
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={(e) => setImages(Array.from(e.target.files))}
                    />
                  </div>

                  <div
                    style={{ display: "flex", gap: "20px" }}
                    id="createProductFormImage"
                  >
                    {/* {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    ))} */}
                  </div>

                  <Button type="submit" disabled={loading ? true : false}>
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </main>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
};

export default NewProdcut;
