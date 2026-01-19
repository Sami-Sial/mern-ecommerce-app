import React, { useState, useEffect } from "react";
import './stylesheets/UpdateProfile.css';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, loadUser } from "../../redux-toolkit/slices/user.slice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, isUpdated, isLoading } = useSelector((state) => state.userSlice);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, avatar }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar?.url);
    }

    if (error) toast.error(error);

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/user/profile");
    }
  }, [user, error, isUpdated, dispatch, navigate]);

  return (
    <>
      <PageTitle title="Ecommerce - Update Profile" />
      <Header />

      <main>
        <div id="up-page-wrapper">
          <div id="up-form-container">
            <form id="up-profile-card" onSubmit={handleSubmit}>
              <h2>Update Profile</h2>

              {/* Avatar */}
              <div id="up-avatar-section">
                <div id="up-avatar-container">
                  <img
                    id="up-avatar-image"
                    src={avatarPreview || avatar}
                    alt="Profile"
                  />
                  <div id="up-avatar-badge">Photo</div>
                </div>
              </div>

              {/* Name Input */}
              <div id="up-input-group">
                <div>
                  <span><FaceIcon /></span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <span><MailOutlineIcon /></span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* File Upload */}
              <div id="up-file-upload">
                <label id="up-file-upload-label">
                  <AccessibilityIcon />
                  <span>Change Profile Photo</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </label>
              </div>

              {/* Submit Button */}
              <button
                id="up-submit-btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UpdateProfile;
