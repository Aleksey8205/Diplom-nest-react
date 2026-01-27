import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import {
  X,
  Search,
  EllipsisVertical,
  SendHorizontal,
  Paperclip,
  Smile,
} from "lucide-react";
import { connectSocket, disconnectSocket } from "../../../../utils/socket";
import "../style/supportChat.css";
import { RootState } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import type { Request } from "../interface/requests";
import type { UserInfo } from "../../../../utils/interface";
import { Message } from "../mainPanel/interface";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const SupportChat = ({ isOpen, onClose }: IModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]); // Явно указываем тип как массив объектов Message
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [supportRequestId, setSupportRequestId] = useState<number | null>(null); 
  const [request, setRequest] = useState<Request>();
  const user = useSelector((state: RootState) => state.auth);

  const [userId, setUserId] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (isOpen && !supportRequestId) {
      fetch(`${API_URL}/api/support-requests?user=${user.user?.id}`)
        .then((res) => res.json())
        .then((results) => {
          if (results.length > 0) {
            const firstRequest = results[0];
            setRequest(firstRequest);
            setSupportRequestId(firstRequest.id);
          } else {
            fetch(`${API_URL}/api/support-requests`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: user.user?.id!,
                text: "",
              }),
            })
              .then((res) => res.json())
              .then((newRequest) => {
                setRequest(newRequest);
                setSupportRequestId(newRequest.id);
              });
          }
        });
    }
  }, [isOpen, supportRequestId, user]);

  useEffect(() => {
    if (supportRequestId !== null) {
      fetch(`${API_URL}/api/support-requests/${supportRequestId}/messages/read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ createdBefore: new Date().toISOString() }),
      });
  
      fetch(`${API_URL}/api/support-requests/${supportRequestId}/messages`)
        .then((res) => res.json())
        .then((msgs) => {
          setMessages(msgs); // Здесь msgs уже имеют тип Message[], поэтому присваиваем напрямую
        });
  
      const newSocket = connectSocket();
      setSocket(newSocket);
      newSocket.emit("subscribeToChat", { supportRequestId });
  
      newSocket.on("newMessage", (msg: Message) => { // now receiving Message object instead of just string
        setMessages((prevMsgs) => [...prevMsgs, msg]);
      });
    }
  }, [supportRequestId]);

  useEffect(() => {
    if (supportRequestId !== null && request?.user) {
      fetch(`${API_URL}/api/users/${request?.user}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((usr) => {
          setUserId(usr);
        })
        .catch((error) => {
          console.error("Ошибка при поиске пользователя:", error);
        });
    }
  }, [supportRequestId, request]);

  const handleSendMessage = () => {
    if (currentMessage.trim() && supportRequestId !== null) {
      fetch(`${API_URL}/api/support-requests/${supportRequestId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ supportRequest: supportRequestId, text: currentMessage, author: user.user?.id }),
      });

      if (socket) {
        socket.emit("sendMessage", {
          supportRequest: supportRequestId,
          text: currentMessage,
          author: user.user?.id,
        });
      }

      const tempMsg: Message = {
        id: 1,
        author: user.user?.id!,
        sentAt: new Date().toISOString(),
        text: currentMessage,
        readAt: null,
      };

      setMessages((prevMsgs) => [...prevMsgs, tempMsg]);

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
              <p>
                <Search />
              </p>
              <p>
                <EllipsisVertical />
              </p>
            </div>
          </header>

          <div className="message-box">
            <p className="created-chat">{dateOnly}</p>
            {messages.map((msg, index) => (
              <div key={index} className="message-item right">
                <p>{userId && userId.name}</p>
                <p>{msg.text}</p>
                <p>{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            ))}
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