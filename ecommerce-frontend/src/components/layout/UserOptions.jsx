import Dropdown from "react-bootstrap/Dropdown";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../../redux-toolkit/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.userSlice);

  const logoutUser = () => {
    navigate("/login");
    dispatch(logout());

    toast.success("Logout Successfully");
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant="secondary">
          <img
            style={{ borderRadius: "5px", marginRight: "10px" }}
            width={30}
            height={25}
            src={user.avatar?.url}
            alt=""
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href={user.role == "user" ? "/user/dashboard" : "/admin/dashboard"}
          >
            Dashboard
          </Dropdown.Item>

          <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserOptions;
