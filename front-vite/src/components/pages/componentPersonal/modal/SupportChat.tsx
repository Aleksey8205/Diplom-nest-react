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
import { connectSocket, disconnectSocket } from "../../../../utils/socket";
import { Message } from "../mainPanel/interface";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const SupportChat = ({ isOpen, onClose }: IModalProps) => {
  const [messages, setMessages] = useState<Message []>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [supportRequestId, setSupportRequestId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (isOpen) {
      fetch(`${API_URL}/api/support-requests/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "" }),
      })
        .then((res) => res.json())
        .then((newRequest) => {
          setSupportRequestId(newRequest.id);

          fetch(`${API_URL}/api/support-requests/${newRequest.id}/messages`, {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((history) => setMessages(history))
            .catch(console.error);
        })
        .catch(console.error);
    }
  }, [isOpen]);

  // 🔥 Отправка сообщения
  const handleSendMessage = () => {
    if (currentMessage.trim() && supportRequestId) {
      fetch(`${API_URL}/api/support-requests/${supportRequestId}/messages`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          requestId: supportRequestId,
        text: currentMessage,
        author: user.user?.id,
         }),
      })
        .then((res) => res.json())
        .then((newMessage) => {
          setMessages((prevMsgs) => [...prevMsgs, newMessage]);
          setCurrentMessage("");
        })
        .catch(console.error);
    }
  };


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
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-item ${
                    msg.author === user.user?.id ? "right" : ""
                  }`}
                >
                  <p>{msg.author}</p>
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
              <p>Нет сообщений.</p> // 🔥 Если сообщений нет, выведем подсказку
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