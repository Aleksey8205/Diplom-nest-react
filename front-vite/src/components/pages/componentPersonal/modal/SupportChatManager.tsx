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

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectUser?: number;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const SupportChatManager = ({ isOpen, onClose, selectUser }: IModalProps) => {
  const user = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [supportRequestId, setSupportRequestId] = useState<number | null>(null);
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    if (isOpen && selectUser) {
      fetch(
        `${API_URL}/support-requests/?user=${selectUser}&isActive=true`,
        {
          method: "GET",
          credentials: "include",
        }
      )
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
            // Если обращений нет, не создаём новый чат
            setSupportRequestId(null);
            setRequest(null);
            setMessages([]);
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении обращений:", error);
        });
    } else {
      disconnectSocket();
    }
  }, [isOpen, selectUser]);

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
                  <p>{user.user?.name}</p> 
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

export default SupportChatManager;