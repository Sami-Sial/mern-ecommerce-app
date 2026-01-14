import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar.jsx";
import { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
import Table from "react-bootstrap/esm/Table.js";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import PageTitle from "../layout/PageTitle";

import EditIcon from "@material-ui/icons/Edit";

const UsersList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading,
    users,
    totalUsersPages,
    userRoleUpdateSuccess,
    deleteUserSuccess,
  } = useSelector((state) => state.adminSlice);

  const [updateUserModalShow, setUpdateUserModalShow] = useState(false);
  const [user, setUser] = useState({});
  console.log(totalUsersPages);
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const showModal = async (id) => {
    try {
      const { data } = await axios.get(
        "${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/admin/user/" + id
      );

      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

    setUpdateUserModalShow(true);
  };

  const updateUserRoleHandler = () => {
    let id = user?._id;
    let role = user?.role;

    dispatch(updateUserRole({ id, role }));
  };

  useEffect(() => {
    if (userRoleUpdateSuccess) {
      clearAdminState();
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
      <PageTitle title={"Ecommerce- Admin Users"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />

          <main>
            <div style={{ display: "flex" }}>
              <Sidebar />

              <div className="content-wrapper">
                <h4 style={{ textAlign: "center" }}>All Users</h4>
                <Table style={{ width: "90%", margin: "auto" }} striped>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {users && (
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <img
                              width={30}
                              height={30}
                              src={user.avatar?.url}
                              alt=""
                            />
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td style={{ display: "flex" }}>
                            <Button
                              onClick={() => showModal(user._id)}
                              style={{ padding: "2px", marginRight: "10px" }}
                              size="sm"
                              variant="danger"
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              onClick={() => deleteUserHandler(user._id)}
                              size="sm"
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </Table>

                {/* pagination */}
                {users && totalUsersPages > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "2rem",
                    }}
                  >
                    <Stack spacing={2}>
                      <Pagination
                        count={totalUsersPages}
                        onChange={(e, page) => setCurrentPage(page)}
                        color="primary"
                      />
                    </Stack>
                  </div>
                )}
              </div>
            </div>
          </main>

          <Modal
            show={updateUserModalShow}
            onHide={() => setUpdateUserModalShow(false)}
          >
            <Modal.Body>
              <big>
                <b style={{ marginRight: "2rem" }}>User Role :</b>
                <b>{user.role}</b>
              </big>
              <br /> <br />
              <Button
                size="sm"
                onClick={() => updateUserRoleHandler()}
                variant="primary"
              >
                Update User Role
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}

      {/* <Footer /> */}
    </>
  );
};

export default UsersList;
