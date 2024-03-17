import React, { useState, useEffect, useRef } from "react";

import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import classes from "./ChatPopup.module.css";
import useHttp from "../../hook/useHttp";
import { getFromStorage } from "../../hook/Storage";
import { jwtDecode } from "jwt-decode";
const ChatPopup = () => {
  const messageRef = useRef(null);
  const [message, setMessage] = useState([]);
  const { resResults } = useHttp();
  const socket = io("https://asm3-njs-tongthe.onrender.com");
  const user = getFromStorage("isLogged");
  const decodedToken = jwtDecode(user.token);

  const messagesEndRef = useRef(null);
  const resResultsRef = useRef(resResults);

  useEffect(() => {
    resResultsRef.current("get", null, "/message", setMessage, user.token);
  }, [user.token]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessage([...message, data]);
    });
    messagesEndRef.current.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [message]);
  const sendMessage = async (e) => {
    e.preventDefault();
    const messageEntered = messageRef.current.value;
    if (!messageEntered) {
      messageRef.current.focus();
      return;
    }
    socket.emit("message", { messageEntered, userId: decodedToken.userId });

    messageRef.current.value = "";
    messageRef.current.focus();
  };

  return (
    <div className={classes.chatPopup}>
      <div className="d-flex justify-content-between p-3 border-bottom">
        <div className="fs-5 fw-bold"> Customer Support</div>
        <div className={classes.let}>Let's Chat App</div>
      </div>

      <div
        className="overflow-auto p-3 d-flex flex-column"
        style={{ height: "400px" }}
      >
        {message.map((m, index) => (
          <div key={index} className="mb-2">
            {decodedToken.userId === m._id ? (
              <div className="d-flex justify-content-end ">
                <div className="w-50" />
                <div
                  className="bg-primary text-white p-1 rounded-4"
                  style={{ wordBreak: "break-word" }}
                >
                  {m.content}
                </div>
              </div>
            ) : (
              <div style={{ width: "70%" }}>
                <div
                  className="p-1 bg-secondary-subtle rounded-4 d-inline-block"
                  style={{ wordBreak: "break-word" }}
                >
                  {m.content}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} className="" />
      </div>

      <form
        className={` d-flex align-items-center  p-3 ${classes.message} `}
        onSubmit={sendMessage}
      >
        <FaUser className="me-3" />
        <input
          type="text"
          placeholder="Enter Message!"
          className="p-1 border-0"
          style={{ outline: "none" }}
          ref={messageRef}
        />

        <FontAwesomeIcon
          icon={faPaperclip}
          className="text-body-tertiary ms-2"
        />
        <FontAwesomeIcon
          icon={faFaceSmile}
          className="text-body-tertiary ms-2"
        />
        <button className="text-primary ms-2 border-0 bg" type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};
export default ChatPopup;
