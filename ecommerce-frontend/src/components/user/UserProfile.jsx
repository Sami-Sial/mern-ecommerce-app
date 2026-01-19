import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PageTitle from "../layout/PageTitle";
import "./stylesheets/UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  console.log(user);

  return (
    <>
      <PageTitle title={`Ecommerce - ${user.name}'s Profile`} />
      <Header />

      <main id="user-profile-main">
        <div id="user-profile-layout">
          {user?.role === "admin" ? <Sidebar /> : null}

          <div id="user-profile-content">
            {/* Page Header */}
            <div id="user-profile-header">
              <h1>My Profile</h1>
              <p>Manage your account information and settings</p>
            </div>

            {user && (
              <div id="profile-card">
                {/* Avatar Section */}
                <div id="profile-avatar-section">
                  <div id="avatar-wrapper">
                    <img
                      src={user.avatar?.url}
                      alt={user.name}
                      id="profile-avatar"
                    />
                    <div id="avatar-badge">
                      {user.role === 'admin' ? '👑' : '👤'}
                    </div>
                  </div>
                  {user?.provider == "email" &&
                    <button
                      className="btn-edit-profile"
                      onClick={() => navigate("/user/profile/update")}
                    >
                      Edit Profile
                    </button>
                  }
                  {user?.provider === "email" && (
                    <button
                      className="btn-change-password"
                      onClick={() =>
                        navigate(
                          user.role === "admin"
                            ? "/admin/password/update"
                            : "/user/password/update"
                        )
                      }
                    >
                      Change Password
                    </button>
                  )}
                </div>

                {/* Profile Info Section */}
                <div id="profile-info-section">
                  <div className="info-item">
                    <div className="info-icon">
                      <PersonIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{user.name}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <EmailIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Email Address</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <AdminPanelSettingsIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Account Role</span>
                      <span className="info-value">
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <CalendarTodayIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Member Since</span>
                      <span className="info-value">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserProfile;