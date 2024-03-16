import { useEffect, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext, getFromStorage } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import classes from "./Navigation.module.css";
const Navigation = () => {
  const { logout } = useContext(AuthContext);
  const isLogged = getFromStorage("adminLogged");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, logout, navigate]);
  const logoutHandle = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className=" ">
      <ToastContainer />
      <div className="container">
        <nav>
          <ul className={`${classes.list} list-unstyled d-flex gap-5`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="createProduct"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Create product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="chat"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                chat
              </NavLink>
            </li>
            <li onClick={logoutHandle}>Logout</li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Navigation;
