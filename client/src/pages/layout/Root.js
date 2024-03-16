import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiMessengerLine } from "react-icons/ri";
import MainNavigation from "./MainNavigation";
import Footer from "../../Components/Footer";
import ChatPopup from "./ChatPopup";
import classes from "./Root.module.css";
import { ToastContainer } from "react-toastify";
const Root = () => {
  const [chat, setChat] = useState(false);
  const auth = useSelector((state) => Object.keys(state.log.user).length > 0);

  return (
    <>
      <ToastContainer />
      <div className="container">
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </div>
      {auth && (
        <>
          <RiMessengerLine
            onClick={() => setChat(!chat)}
            className={classes.icon}
          />
          <div className="position-relative">{chat && <ChatPopup />}</div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Root;
