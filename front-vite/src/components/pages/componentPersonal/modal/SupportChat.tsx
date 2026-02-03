import { useState, useCallback, useEffect } from "react";
import ReactModal from "react-modal";
import {
  Search,
  EllipsisVertical,
  SendHorizontal,
  Paperclip,
  Smile,
} from "lucide-react";
import { connectSocket } from "../../../../utils/socket";
import "../style/supportChat.css";
import { RootState } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import type { Request } from "../interface/requests";
import { Message } from "../mainPanel/interface";
import { UserInfo } from "../../../../utils/interface";

interface IModalProps {
  isOpen: boolean;
  selectUser?: number;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const SupportChat = ({ isOpen, selectUser, onClose }: IModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [supportRequestId, setSupportRequestId] = useState<number>();
  const [request, setRequest] = useState<Request>();
  const user = useSelector((state: RootState) => state.auth);
  const [userId, setUserId] = useState<UserInfo | null>(null);

  // Метод загрузки данных и инициализации сокета
  const initializeChat = useCallback(async () => {
    if (!isOpen) return;

    let targetUserId = selectUser || user.user?.id;
    fetch(`${API_URL}/api/support-requests?user=${targetUserId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.length > 0) {
          const firstRequest = results[0];
          setRequest(firstRequest);
          setSupportRequestId(firstRequest.id);
          
          // Загружаем предыдущие сообщения
          fetch(`${API_URL}/api/support-requests/${firstRequest.id}/messages`, {
            credentials: "include",
          }).then((res) => res.json()).then((msgs) => {
            setMessages(msgs);
          });
        }
      });

    // Устанавливаем соединение с WebSocket
    if (supportRequestId !== null) {
      const newSocket = connectSocket();
      setSocket(newSocket);

      // Прислушиваемся к событию получения новых сообщений
      newSocket.on("newMessage", (msg: Message) => {
        setMessages((prevMsgs) => [...prevMsgs, msg]);
      });


      newSocket.emit("subscribeToChat", { supportRequest: supportRequestId });
    }
  }, [isOpen, selectUser, user, supportRequestId]);

  // Запускаем инициализацию при открытии модала
  useEffect(() => {
    if (isOpen) {
      initializeChat();
    } else {
      // Отключаемся от сокета при закрытии модала
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [isOpen, initializeChat, socket]);

  const handleSendMessage = () => {
    if (currentMessage.trim() && supportRequestId !== null) {
      fetch(`${API_URL}/api/support-requests/${supportRequestId}/messages`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supportRequest: supportRequestId,
          text: currentMessage,
          author: user.user?.id,
        }),
      });

      if (socket) {
        socket.emit("sendMessage", {
          supportRequest: supportRequestId,
          text: currentMessage,
          author: user.user?.id,
        });
      }

      setCurrentMessage("");
    }
  };

  if (!request) {
    return null;
  }

  const fullDateTime = request.createdAt;
  const dateOnly = new Date(fullDateTime).toLocaleDateString();

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
            <a href="">LOGO</a>
            <p>Техподдержка</p>
            <div className="flex">
              <p><Search /></p>
              <p><EllipsisVertical /></p>
            </div>
          </header>

          <div className="message-box">
            <p className="created-chat">{dateOnly}</p>
            {messages.map((msg, index) => (
              <div key={index} className={`message-item ${msg.author === user.user?.id ? 'right' : ''}`}>
                <p>{userId && userId.name}</p>
                <p>{msg.text}</p>
                <p>
                  {new Date(msg.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="input-message">
            <button type="button"><Paperclip /></button>
            <input
              className="message"
              placeholder="Сообщение..."
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button type="button"><Smile /></button>
            <button type="button" onClick={handleSendMessage}><SendHorizontal /></button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default SupportChat;