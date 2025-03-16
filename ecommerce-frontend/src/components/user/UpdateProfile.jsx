import React, { Fragment, useState, useEffect } from "react";
import "./stylesheets/UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

import { updateProfile, loadUser } from "../../redux-toolkit/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, isUpdated } = useSelector((state) => state.userSlice);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileDataChange = (e) => {
    setAvatar(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, avatar }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar?.url);
    }

    if (error) {
      toast.error(error);
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully.");
      dispatch(loadUser());

      navigate("/user/profile");
    }
  }, [dispatch, error, user]);

  return (
    <>
      <PageTitle title={"Ecommerce- Update Profile"} />
      <Header />

      <main>
        <div className="form">
          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <h2>Update Profile</h2>

            <div className="input-group">
              <span className="icon-wrapper">
                <FaceIcon />
              </span>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="icon-wrapper">
                <MailOutlineIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={{ flexDirection: "column" }}>
              <div>
                <p style={{ marginBottom: "5px" }}>Original Image</p>
                <img
                  style={{ borderRadius: "5px" }}
                  width={100}
                  height={100}
                  src={avatar}
                  alt="Avatar"
                />
              </div>
              <p style={{ margin: "10px 0 2px" }}>Change Image</p>

              <div className="input-group">
                <span className="icon-wrapper">
                  <AccessibilityIcon />
                </span>
                <input
                  style={{ padding: "2px 10px" }}
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div>
            </div>

            <Button onClick={updateProfileSubmit} variant="dark">
              Update Profile
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UpdateProfile;
