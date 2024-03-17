import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import useHttp from "../hook/useHttp";
import { getFromStorage } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
const Chat = () => {
  const messageRef = useRef(null);
  const [listChat, setListChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState("");
  const { resResults } = useHttp();
  const messagesEndRef = useRef(null);
  const adminUser = getFromStorage("adminLogged");
  const decodedToken = jwtDecode(adminUser.token);

  const socket = io("https://asm3-njs-tongthe.onrender.com");

  const resResultsRef = useRef(resResults);
  useEffect(() => {
    resResultsRef.current(
      "get",
      null,
      "/admin/listMessage",
      setListChat,
      adminUser.token
    );
  }, [adminUser.token]);

  const viewMessage = async (id) => {
    const message = listChat.find((item) => item.customerId === id);

    setChat(message.roomChat);
    setUserId(id);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      console.log(chat.length > 0 && chat[0]._id);
      if (chat.length > 0 && data.userId === chat[0]._id) {
        setChat([...chat, data]);
      }
      return;
    });
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageEntered = messageRef.current.value;
    if (!messageEntered) {
      messageRef.current.focus();
      return;
    }
    socket.emit("message", {
      messageEntered,
      userId,
      adminId: decodedToken.userId,
    });
    messageRef.current.value = "";
    messageRef.current.focus();
  };

  return (
    <div className="bg-white p-3">
      <h2 className="fw-medium">Chat</h2>
      <p className="text-secondary mb-3">Apps/chat</p>

      <div className="row d-flex">
        <div className="col-3 p-0">
          <div className="border-bottom p-3">
            <input
              type="search"
              className="form-control "
              placeholder="Search Contact"
            />
          </div>
          <div>
            <ul className="list-group list-group-flush">
              {listChat.map((item) => (
                <li
                  className={`list-group-item ${
                    userId === item.customerId && "bg-secondary-subtle "
                  }`}
                  key={item.customerId}
                  onClick={() => viewMessage(item.customerId)}
                >
                  {item.customerId}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-9 border-start p-0">
          <div style={{ height: "650px" }} className="overflow-auto p-3">
            {chat && (
              <>
                {chat.map((item, index) => (
                  <div key={index} className="mb-2">
                    {decodedToken.userId === item._id ? (
                      <div className="d-flex justify-content-end ">
                        <div className="w-50" />
                        <div
                          className="bg-primary text-white p-1 rounded-4"
                          style={{ wordBreak: "break-word" }}
                        >
                          {item.content}
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: "70%" }}>
                        <div
                          className="p-1 bg-secondary-subtle rounded-4 d-inline-block"
                          style={{ wordBreak: "break-word" }}
                        >
                          {item.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <form
            className="border-top d-flex justify-content-between align-items-center"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              placeholder="Type and enter"
              className="border-0 p-4 fs-5 w-100"
              style={{ outline: "none" }}
              ref={messageRef}
            />
            <button
              className="text-primary ms-2 p-4 border-0 bg-white"
              type="submit"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
