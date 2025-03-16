import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "react-bootstrap/esm/Button";
import PageTitle from "../layout/PageTitle";
import { useSelector } from "react-redux";

const FavouriteProducts = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <>
      <PageTitle title={`Ecommerce - ${user.name}' favourite products`} />
      <Header />

      <main>
        <Sidebar />
      </main>

      <Footer />
    </>
  );
};

export default FavouriteProducts;
