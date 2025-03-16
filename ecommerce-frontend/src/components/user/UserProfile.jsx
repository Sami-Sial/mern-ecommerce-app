import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  console.log(user);

  return (
    <>
      <PageTitle title={`Ecommerce-${user.name}'s Dashboard`} />
      <Header />
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div
            className="content-wrapper"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "0",
            }}
          >
            {user && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <img
                    src={user.avatar?.url}
                    width={200}
                    height={200}
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  {user?.privider == "email" && (
                    <Button
                      onClick={() => navigate("/user/profile/update")}
                      variant="secondary"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  <p>Name : {user.name}</p>
                  <p>Email : {user.email}</p>
                  <p>Role : {user.role}</p>
                  <p>CreatedAt: {user.createdAt.toString().slice(0, 10)}</p>
                  {user?.provider == "email" && (
                    <Button
                      onClick={() =>
                        navigate(
                          user.role === "admin"
                            ? "/admin/password/update"
                            : "/user/password/update"
                        )
                      }
                      variant="secondary"
                    >
                      Change Password
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserProfile;
