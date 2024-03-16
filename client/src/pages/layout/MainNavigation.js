import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "../../store/Log";
import { FaCartFlatbed } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getFromStorage } from "../../hook/Storage";
import useHttp from "../../hook/useHttp";
import classes from "./MainNavigation.module.css";
import { jwtDecode } from "jwt-decode";
const MainNavigation = () => {
  const auth = useSelector((state) => Object.keys(state.log.user).length > 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resResults } = useHttp();
  const user = getFromStorage("isLogged");

  const decodedToken = user.token && jwtDecode(user.token);

  const logoutHandler = async () => {
    await resResults("post", { id: decodedToken.userId }, "/logout");
    localStorage.removeItem("isLogged");
    dispatch(logActions.logout());
    navigate("/");
  };

  const linkNav = (link, name, icon) => (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        {icon} {name}
      </NavLink>
    </li>
  );

  return (
    <>
      <nav>
        <ul
          className={`list-unstyled d-flex justify-content-between align-items-center ${classes.list}`}
        >
          <div className="d-flex gap-3">
            {linkNav("/", "Home")}
            {linkNav("shop", "shop")}
          </div>
          <li className="fst-italic fs-2">BOUTIQUE</li>
          <div className="d-flex gap-3">
            {!auth && linkNav("login", "login", <FaUser />)}
            {auth && linkNav("cart", "cart", <FaCartFlatbed />)}
            {auth && linkNav("history", "history")}
            {auth && (
              <>
                <li>
                  <FaUser />
                  {decodedToken.email}
                </li>
                <li onClick={logoutHandler}>(logout)</li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default MainNavigation;
