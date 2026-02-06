// src/components/mainPanel/SupportChat.tsx

import { useState, useCallback, useEffect } from "react";
import ReactModal from "react-modal";
import {
  Search,
  EllipsisVertical,
  SendHorizontal,
  Paperclip,
  Smile,
} from "lucide-react";
import "../style/supportChat.css";
import { RootState } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  emitMessage,
} from "../../../../utils/socket";
import { Message } from "../mainPanel/interface";
import type { Request } from "../interface/requests";

// Интерфейс пропсов Modal'а
interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectUser?: number;
  isManager?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const SupportChat = ({ isOpen, onClose, selectUser, isManager }: IModalProps) => {
  const user = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [supportRequestId, setSupportRequestId] = useState<number | null>(null);
  const [request, setRequest] = useState<Request | null>(null);

  // Кеш для хранения имён пользователей
  const [userNames, setUserNames] = useState<Record<number, string | null>>({});

  useEffect(() => {
    if (isOpen) {
      let queryParams = isManager && selectUser
        ? `user=${selectUser}&isActive=true`
        : `user=${user.user?.id}&isActive=true`;

      fetch(`${API_URL}/support-requests/?${queryParams}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setSupportRequestId(data[0].id);
            setRequest(data[0]);

            fetch(`${API_URL}/support-requests/${data[0].id}/messages`, {
              method: "GET",
              credentials: "include",
            })
              .then((resp) => resp.json())
              .then((msgs) => {
                setMessages(msgs);
              })
              .catch((error) => {
                console.error("Ошибка при получении сообщений:", error);
              });
          } else {
            if (!isManager) {
              fetch(`${API_URL}/support-requests`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user: user.user?.id,
                  isActive: true,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setSupportRequestId(data.id);
                  setRequest(data);

                  setMessages([]);
                })
                .catch((error) => {
                  console.error("Ошибка при создании обращения:", error);
                });
            } else {
              setSupportRequestId(null);
              setRequest(null);
              setMessages([]);
            }
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении обращений:", error);
        });
    } else {
      disconnectSocket();
    }
  }, [isOpen, user, selectUser, isManager]);

  useEffect(() => {
    if (supportRequestId) {
      connectSocket(supportRequestId, {
        onConnect: () => {
          console.log("Connected to the websocket server");
        },
        onNewMessage: (newMessage: Message) => {
          setMessages((prevMsgs) => [...prevMsgs, newMessage]);
        },
        onMarkedAsRead: () => {
          console.log("Messages marked as read");
        },
      });
    }
  }, [supportRequestId]);

  const handleSendMessage = useCallback(async () => {
    if (currentMessage.trim() && supportRequestId) {
      emitMessage({
        author: user.user?.id,
        text: currentMessage,
        supportRequest: supportRequestId,
      });

      setCurrentMessage("");
    }
  }, [currentMessage, user, supportRequestId]);

  useEffect(() => {
    const messagesBox = document.querySelector(".message-box");
    if (messagesBox) {
      messagesBox.scrollTo(0, messagesBox.scrollHeight);
    }
  }, [messages]);

  const fetchUserName = useCallback(
    async (userId: number) => {
      if (!userNames[userId]) {
        try {
          const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "GET",
            credentials: "include",
          });
          const userData = await response.json();
          setUserNames((prevUserNames) => ({
            ...prevUserNames,
            [userId]: userData.name,
          }));
        } catch (error) {
          console.error("Ошибка при получении имени пользователя:", error);
        }
      }
    },
    [userNames]
  );

  useEffect(() => {
    const uniqueUserIds = [...new Set(messages.map((msg) => msg.author))];
    uniqueUserIds.forEach((userId) => {
      if (!userNames[userId]) {
        fetchUserName(userId);
      }
    });
  }, [messages, userNames, fetchUserName]);

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        overlayClassName="modal-overlay"
        className="chat-container"
      >
        <div className="chat-box">
          <header className="header-chat">
            <a href="#">LOGO</a>
            <p>Техподдержка</p>
            <div className="flex">
              <p>
                <Search />
              </p>
              <p>
                <EllipsisVertical />
              </p>
            </div>
          </header>

          <div className="message-box">
            <p className="created-chat">
              {request?.createdAt
                ? new Date(request.createdAt)
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, ".")
                : ""}
            </p>
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-item ${
                    msg.author === user.user?.id ? "right" : "left"
                  }`}
                >
                  <p>{userNames[msg.author] || "Неизвестный пользователь"}</p> 
                  <p>{msg.text}</p>
                  <p>
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p>Нет сообщений.</p>
            )}
          </div>
          <div className="input-message">
            <button type="button">
              <Paperclip />
            </button>
            <input
              className="message"
              placeholder="Сообщение..."
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button type="button">
              <Smile />
            </button>
            <button type="button" onClick={handleSendMessage}>
              <SendHorizontal />
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default SupportChat;