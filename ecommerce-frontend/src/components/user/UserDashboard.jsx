import React, { useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";
import "./stylesheets/UserDashboard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Button from "react-bootstrap/Button";
import DashboardTop from "../layout/DashboardTop";

import Sidebar from "../layout/DashboardSidebar";

const Account = () => {
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.userSlice
  );

  return (
    <>
      <PageTitle title={`Ecommerce - ${user.name}'s Dashboard`} />
      <Header />
      <DashboardTop />
      <main>
        <div id="profile-container">
          <Sidebar />

          <div className="content-wrapper"></div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Account;
