import "./stylesheets/LoginSignUp.css";
import { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signup, clearUserState, loginWithGoogle } from "../../redux-toolkit/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, signupSuccess, signupError, isLoading } = useSelector(
    (state) => state.userSlice
  );

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = userData;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const continueWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        dispatch(loginWithGoogle(res.data));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password, avatar }));
  };

  useEffect(() => {
    if (signupError) {
      toast.error(signupError);
      dispatch(clearUserState());
    }

    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/user/profile");
    }

    if (signupSuccess) {
      toast.success("Signup successful. Welcome!");
      dispatch(clearUserState());
    }
  }, [user, dispatch, signupSuccess, signupError, navigate]);

  return (
    <>
      <Header />

      <main className="wrapper">
        <div className="form">
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <h2>Create New Account</h2>

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
                onChange={registerDataChange}
                autoComplete="true"
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
                onChange={registerDataChange}
                autoComplete="true"
              />
            </div>

            <div className="input-group">
              <span className="icon-wrapper">
                <LockOpenIcon />
              </span>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group">
              <input
                style={{
                  border: "2px solid #37475a",
                  width: "99%",
                  borderRadius: "10px",
                }}
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                required
              />
            </div>

            {avatarPreview && (
              <div style={{ margin: "auto" }}>
                <img
                  style={{ width: "60px" }}
                  src={avatarPreview}
                  alt="Avatar Preview"
                />
              </div>
            )}

            {/* 🔹 SIGNUP BUTTON WITH LOADING STATE */}
            <button
              type="submit"
              className="form-btn"
              disabled={isLoading}
              style={{
                backgroundColor: "#111827",
                color: "#fff",
                cursor: isLoading ? "not-allowed" : "pointer",
                marginTop: "1rem",
              }}
            >
              {isLoading ? "Signing up..." : "Register"}
            </button>

            <button
              className="form-btn"
              style={{
                backgroundColor: "#131921",
                marginTop: "1rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                continueWithGoogle();
              }}
            >
              Continue with Google
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Signup;
