import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar.jsx";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  getAllUsers,
  deleteUser,
  clearAdminState,
  updateUserRole,
} from "../../redux-toolkit/slices/admin.slice.jsx";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import PageTitle from "../layout/PageTitle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./stylesheets/AdminUsers.css";
import TableSkeleton from "../skeletons/TableSkeleton";

const UsersList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isLoading,
    users,
    totalUsersPages,
    userRoleUpdateSuccess,
    deleteUserSuccess,
    isUpdating,
    isDeleting,
    totalUsers
  } = useSelector((state) => state.adminSlice);

  const [updateUserModalShow, setUpdateUserModalShow] = useState(false);
  const [user, setUser] = useState({});

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const showModal = async (id) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/admin/user/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser(data.user);
      setUpdateUserModalShow(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const updateUserRoleHandler = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    dispatch(updateUserRole({ id, role: newRole }));
  };


  useEffect(() => {
    if (userRoleUpdateSuccess) {
      dispatch(clearAdminState());
      setUpdateUserModalShow(false);
      toast.success("User role changed successfully");
    }

    if (deleteUserSuccess) {
      dispatch(clearAdminState());
      toast.success("User deleted successfully");
    }

    dispatch(getAllUsers(currentPage));
  }, [dispatch, userRoleUpdateSuccess, deleteUserSuccess, currentPage]);

  return (
    <>
      <PageTitle title={"Ecommerce - Admin Users"} />
      <Header />

      <main id="admin-users-main">
        <div id="admin-users-layout">
          <Sidebar />

          {isLoading ? <div style={{ width: "95%", margin: "2rem auto" }}>
            <TableSkeleton />
          </div> : <> {users && users.length ? (
            <div id="admin-users-content">
              {/* Page Header */}
              <div id="admin-users-header">
                <div>
                  <h1>All Users</h1>
                  <p>Manage user accounts and permissions</p>
                </div>
                <div id="users-stats">
                  <div className="stat-badge">
                    <span className="stat-label">Total Users</span>
                    <span className="stat-value">{totalUsers}</span>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div id="users-table-container">
                <table id="users-table">
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <img
                            className="user-avatar"
                            src={user.avatar?.url}
                            alt={user.name}
                          />
                        </td>
                        <td className="user-name">{user.name}</td>
                        <td className="user-email">{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {/* <button
                              className="btn-edit"
                              onClick={() => showModal(user._id)}
                              title="Edit User"
                            >
                              <EditIcon />
                            </button> */}
                            <button
                              className="btn-delete"
                              onClick={() => deleteUserHandler(user._id)}
                              title="Delete User"
                              disabled={isDeleting}
                              style={{
                                opacity: isDeleting ? 0.5 : 1,
                                cursor: isDeleting ? "not-allowed" : "pointer",
                              }}
                            >
                              {isDeleting ? "Deleting..." : <DeleteIcon />}
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {users && totalUsersPages > 1 && (
                <div id="users-pagination">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalUsersPages}
                      page={currentPage}
                      onChange={(e, page) => setCurrentPage(page)}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </div>
              )}
            </div>
          ) : (
            <div id="no-users-container">
              <div id="no-users-content">
                <div className="no-users-icon">👥</div>
                <h2>No Users Yet</h2>
                <p>There are no users to display at the moment.</p>
              </div>
            </div>
          )}</>}

        </div>
      </main>

      {/* Update Role Modal */}
      <Modal
        show={updateUserModalShow}
        onHide={() => setUpdateUserModalShow(false)}
        centered
        className="user-role-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          <div className="user-info">
            <img src={user.avatar?.url} alt={user.name} className="modal-avatar" />
            <div className="modal-user-details">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="role-info">
            <span className="role-label">Current Role:</span>
            <span className={`role-badge ${user.role}`}>{user.role}</span>
          </div>
          <div className="role-toggle">
            <span className="toggle-label">Switch to:</span>
            <span className={`role-badge ${user.role === 'admin' ? 'user' : 'admin'}`}>
              {user.role === 'admin' ? 'user' : 'admin'}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-cancel"
            onClick={() => setUpdateUserModalShow(false)}
          >
            Cancel
          </button>
          <button
            className="btn-update-role"
            onClick={() => updateUserRoleHandler(user._id, user.role)}
            disabled={isUpdating}
            style={{
              opacity: isUpdating ? 0.5 : 1,
              cursor: isUpdating ? "not-allowed" : "pointer",
            }}
          >
            {isUpdating ? "Updating..." : "Update Role"}
          </button>


        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersList;